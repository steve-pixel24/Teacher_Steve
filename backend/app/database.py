"""The database check behind the health URL."""

import asyncio
import logging
from collections.abc import Awaitable, Callable
from typing import Literal

import psycopg

logger = logging.getLogger(__name__)

DatabaseStatus = Literal["reachable", "unreachable", "not_configured"]
DatabaseCheck = Callable[[str | None], Awaitable[DatabaseStatus]]

CONNECT_TIMEOUT_SECONDS = 2
# One deadline for connecting, querying, and closing together.
DEADLINE_SECONDS = 3


async def check_database(database_url: str | None) -> DatabaseStatus:
    """Run SELECT 1 through the connection string and report one status word.

    Never raises, never logs more than the exception's type name, and never
    returns an address or error text.
    """
    # An empty string would make psycopg connect with its defaults, so a blank
    # value must never get as far as a connection attempt.
    if not database_url or not database_url.strip():
        return "not_configured"

    try:
        async with asyncio.timeout(DEADLINE_SECONDS):
            # Prepared statements stay off because Supabase's transaction pooler
            # can't keep them between statements. Autocommit skips the BEGIN.
            connection = await psycopg.AsyncConnection.connect(
                database_url,
                connect_timeout=CONNECT_TIMEOUT_SECONDS,
                prepare_threshold=None,
                autocommit=True,
            )
            try:
                await connection.execute("SELECT 1")
            finally:
                await connection.close()
    except Exception as exc:  # noqa: BLE001
        # Any failure (refused, timed out, bad credentials, malformed string)
        # means the same thing to the caller. The message can hold the host or
        # user, so only the type name is logged.
        logger.warning("Database check failed: %s", type(exc).__name__)
        return "unreachable"

    return "reachable"


def get_database_check() -> DatabaseCheck:
    """FastAPI dependency that supplies the check, so tests can replace it."""
    return check_database
