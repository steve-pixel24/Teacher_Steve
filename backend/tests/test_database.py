"""Tests for the real database check.

These never reach a database or the internet. psycopg is replaced with a stub, or
the check is pointed at a closed port on this machine.
"""

import asyncio
import time

import psycopg
import pytest

from app import database
from app.database import check_database
from tests.support import FAKE_PASSWORD, FAKE_URL, FAKE_USER, fail_to_connect


class StubConnection:
    def __init__(self, execute_error: Exception | None = None) -> None:
        self.execute_error = execute_error
        self.statements: list[str] = []
        self.closed = False

    async def execute(self, statement: str):
        self.statements.append(statement)
        if self.execute_error is not None:
            raise self.execute_error

    async def close(self) -> None:
        self.closed = True


def stub_connect(monkeypatch: pytest.MonkeyPatch, connection: StubConnection):
    """Replace psycopg's connect and return the list of its calls."""
    calls: list[tuple[tuple, dict]] = []

    async def connect(*args, **kwargs):
        calls.append((args, kwargs))
        return connection

    monkeypatch.setattr(psycopg.AsyncConnection, "connect", connect)
    return calls


# --- Not configured ---------------------------------------------------------


@pytest.mark.parametrize("value", [None, "", "   "])
def test_missing_or_blank_connection_string_is_not_configured_without_connecting(
    monkeypatch, value
):
    async def refuse(*args, **kwargs):
        raise AssertionError("the check must not try to connect")

    monkeypatch.setattr(psycopg.AsyncConnection, "connect", refuse)

    assert asyncio.run(check_database(value)) == "not_configured"


# --- Reachable --------------------------------------------------------------


def test_reachable_runs_select_1_and_closes_the_connection(monkeypatch):
    connection = StubConnection()
    calls = stub_connect(monkeypatch, connection)

    assert asyncio.run(check_database(FAKE_URL)) == "reachable"

    assert connection.statements == ["SELECT 1"]
    assert connection.closed
    ((args, kwargs),) = calls
    assert args == (FAKE_URL,)
    # Prepared statements stay off because the transaction pooler can't keep them.
    assert kwargs["prepare_threshold"] is None
    assert kwargs["connect_timeout"] == 2


# --- Unreachable ------------------------------------------------------------


def test_failed_query_is_unreachable_and_still_closes_the_connection(monkeypatch):
    connection = StubConnection(execute_error=psycopg.OperationalError("query failed"))
    stub_connect(monkeypatch, connection)

    assert asyncio.run(check_database(FAKE_URL)) == "unreachable"

    assert connection.closed


def test_failure_logs_only_the_exception_type_name(monkeypatch, caplog):
    monkeypatch.setattr(psycopg.AsyncConnection, "connect", fail_to_connect)

    assert asyncio.run(check_database(FAKE_URL)) == "unreachable"

    assert "OperationalError" in caplog.text


def test_a_hung_connection_is_unreachable_at_the_deadline(monkeypatch):
    async def hang(*args, **kwargs):
        await asyncio.sleep(30)

    monkeypatch.setattr(psycopg.AsyncConnection, "connect", hang)
    monkeypatch.setattr(database, "DEADLINE_SECONDS", 0.1)
    started = time.monotonic()

    assert asyncio.run(check_database(FAKE_URL)) == "unreachable"

    assert time.monotonic() - started < 2


@pytest.mark.parametrize(
    "malformed",
    [
        "not a connection string",
        "postgresql://user:pass@host:notaport/db",
        "postgresql://[::1",
        "host=",
        "\x00",
    ],
)
def test_malformed_connection_string_is_unreachable_without_raising(malformed):
    assert asyncio.run(check_database(malformed)) == "unreachable"


def test_closed_port_is_unreachable_within_the_deadline():
    # Port 1 on this machine refuses at once. Nothing leaves the machine.
    closed_port_url = f"postgresql://{FAKE_USER}:{FAKE_PASSWORD}@127.0.0.1:1/postgres"
    started = time.monotonic()

    assert asyncio.run(check_database(closed_port_url)) == "unreachable"

    assert time.monotonic() - started < database.DEADLINE_SECONDS + 1
