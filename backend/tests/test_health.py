"""Health reply tests.

A fake check stands in for the database through a dependency override, and the
settings are built without reading any .env file, so no test opens a connection.
Every test also asserts, after it runs, that captured logs and output contain
nothing from the fake connection string.
"""

from pathlib import Path

import psycopg
import pytest
from fastapi.testclient import TestClient

from app.database import DatabaseStatus, get_database_check
from app.main import create_app
from app.settings import Settings, get_settings
from tests.support import FAKE_URL, assert_no_secret_parts, fail_to_connect

NOT_CONFIGURED = {
    "backend": "ok",
    "database": "not_configured",
    "project": "not_configured",
}


class FakeCheck:
    """A stand-in for the database check that records how it was called."""

    def __init__(self, result: DatabaseStatus = "reachable") -> None:
        self.result = result
        self.calls: list[str | None] = []

    async def __call__(self, database_url: str | None) -> DatabaseStatus:
        self.calls.append(database_url)
        return self.result


@pytest.fixture(autouse=True)
def clean_environment(monkeypatch: pytest.MonkeyPatch) -> None:
    for name in ("DATABASE_URL", "DATABASE_LABEL", "VERCEL", "VERCEL_ENV"):
        monkeypatch.delenv(name, raising=False)


@pytest.fixture(autouse=True)
def fresh_settings_cache():
    get_settings.cache_clear()
    yield
    get_settings.cache_clear()


@pytest.fixture
def get_health(monkeypatch: pytest.MonkeyPatch):
    """Call /api/health with the given environment and a fake check."""

    def call(
        *,
        database_url: str | None = None,
        database_label: str | None = None,
        check_result: DatabaseStatus = "reachable",
    ):
        if database_url is not None:
            monkeypatch.setenv("DATABASE_URL", database_url)
        if database_label is not None:
            monkeypatch.setenv("DATABASE_LABEL", database_label)
        app = create_app()
        fake_check = FakeCheck(check_result)
        app.dependency_overrides[get_settings] = lambda: Settings(_env_file=None)
        app.dependency_overrides[get_database_check] = lambda: fake_check
        return TestClient(app).get("/api/health"), fake_check

    return call


# --- Health replies ---------------------------------------------------------


def test_no_connection_string_and_no_label_reports_not_configured(get_health):
    # AE1
    response, fake_check = get_health()

    assert response.status_code == 200
    assert response.json() == NOT_CONFIGURED
    assert fake_check.calls == []


@pytest.mark.parametrize("label", [None, "", "preview", "production"])
def test_empty_connection_string_is_not_configured_and_never_checked(get_health, label):
    # As copied from .env.example, where both values are empty.
    response, fake_check = get_health(database_url="", database_label=label)

    assert response.status_code == 200
    assert response.json() == NOT_CONFIGURED
    assert fake_check.calls == []


@pytest.mark.parametrize(
    ("label", "check_result", "database", "project"),
    [
        ("preview", "reachable", "reachable", "preview"),
        ("production", "reachable", "reachable", "production"),
        (None, "reachable", "reachable", "not_configured"),
        ("", "reachable", "reachable", "not_configured"),
        ("staging", "reachable", "reachable", "not_configured"),
        ("Preview", "reachable", "reachable", "not_configured"),
        ("preview", "unreachable", "unreachable", "preview"),
        ("production", "unreachable", "unreachable", "production"),
        (None, "unreachable", "unreachable", "not_configured"),
        ("staging", "unreachable", "unreachable", "not_configured"),
    ],
)
def test_reply_for_each_configuration(
    get_health, label, check_result, database, project
):
    response, fake_check = get_health(
        database_url=FAKE_URL, database_label=label, check_result=check_result
    )

    assert response.status_code == 200
    assert response.json() == {
        "backend": "ok",
        "database": database,
        "project": project,
    }
    assert fake_check.calls == [FAKE_URL]


def test_settings_come_from_the_get_settings_dependency():
    app = create_app()
    app.dependency_overrides[get_settings] = lambda: Settings(
        _env_file=None, database_url=FAKE_URL, database_label="production"
    )
    app.dependency_overrides[get_database_check] = lambda: FakeCheck("reachable")

    response = TestClient(app).get("/api/health")

    assert response.json() == {
        "backend": "ok",
        "database": "reachable",
        "project": "production",
    }


@pytest.mark.parametrize("check_result", ["reachable", "unreachable"])
def test_reply_holds_only_status_words(get_health, check_result):
    # AE6
    response, _ = get_health(
        database_url=FAKE_URL, database_label="production", check_result=check_result
    )

    assert_no_secret_parts(response.text)
    assert set(response.json()) == {"backend", "database", "project"}
    assert set(response.json().values()) <= {
        "ok",
        "reachable",
        "unreachable",
        "not_configured",
        "production",
    }


def test_connection_string_pasted_into_label_is_ignored_and_never_echoed(get_health):
    response, _ = get_health(database_url=FAKE_URL, database_label=FAKE_URL)

    assert response.status_code == 200
    assert response.json() == {
        "backend": "ok",
        "database": "reachable",
        "project": "not_configured",
    }
    assert_no_secret_parts(response.text)


def test_reply_is_never_cached(get_health):
    for kwargs in ({}, {"database_url": FAKE_URL, "database_label": "preview"}):
        response, _ = get_health(**kwargs)
        assert response.headers["cache-control"] == "no-store"


def test_every_request_runs_the_check_again(get_health):
    # KTD9: no result cache.
    app = create_app()
    fake_check = FakeCheck("reachable")
    app.dependency_overrides[get_settings] = lambda: Settings(
        _env_file=None, database_url=FAKE_URL, database_label="preview"
    )
    app.dependency_overrides[get_database_check] = lambda: fake_check
    client = TestClient(app)

    client.get("/api/health")
    client.get("/api/health")

    assert fake_check.calls == [FAKE_URL, FAKE_URL]


def test_real_check_failure_reaches_the_reply_as_a_word_only(
    monkeypatch: pytest.MonkeyPatch, caplog: pytest.LogCaptureFixture
):
    # AE6 through the real check: psycopg fails with a message that carries the
    # host and the password, and only the exception's type name may surface.
    monkeypatch.setattr(psycopg.AsyncConnection, "connect", fail_to_connect)
    monkeypatch.setenv("DATABASE_URL", FAKE_URL)
    monkeypatch.setenv("DATABASE_LABEL", "production")
    app = create_app()
    app.dependency_overrides[get_settings] = lambda: Settings(_env_file=None)

    response = TestClient(app).get("/api/health")

    assert response.status_code == 200
    assert response.json() == {
        "backend": "ok",
        "database": "unreachable",
        "project": "production",
    }
    assert_no_secret_parts(response.text)
    assert "OperationalError" in caplog.text


# --- Routes and docs --------------------------------------------------------


def test_health_without_the_api_prefix_is_not_found():
    app = create_app()

    assert TestClient(app).get("/health").status_code == 404


@pytest.mark.parametrize("vercel_env", [None, "preview", "development"])
def test_docs_answer_under_api_outside_production(monkeypatch, vercel_env):
    if vercel_env is not None:
        monkeypatch.setenv("VERCEL_ENV", vercel_env)
    client = TestClient(create_app())

    assert client.get("/api/docs").status_code == 200
    assert client.get("/api/openapi.json").status_code == 200
    assert client.get("/api/redoc").status_code == 200
    assert client.get("/docs").status_code == 404
    assert client.get("/openapi.json").status_code == 404


def test_docs_are_off_in_production(monkeypatch):
    monkeypatch.setenv("VERCEL_ENV", "production")
    client = TestClient(create_app())

    for path in ("/api/docs", "/api/openapi.json", "/api/redoc", "/docs"):
        assert client.get(path).status_code == 404


def test_health_still_answers_in_production(monkeypatch):
    monkeypatch.setenv("VERCEL_ENV", "production")
    app = create_app()
    app.dependency_overrides[get_settings] = lambda: Settings(_env_file=None)

    response = TestClient(app).get("/api/health")

    assert response.status_code == 200
    assert response.json() == NOT_CONFIGURED


# --- Settings ---------------------------------------------------------------


def test_settings_hold_the_connection_string_as_a_secret():
    settings = Settings(_env_file=None, database_url=FAKE_URL)

    assert_no_secret_parts(repr(settings))
    assert_no_secret_parts(str(settings))
    assert settings.database_url is not None
    assert settings.database_url.get_secret_value() == FAKE_URL


def test_empty_environment_values_are_treated_as_unset(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", "")
    monkeypatch.setenv("DATABASE_LABEL", "")

    settings = Settings(_env_file=None)

    assert settings.database_url is None
    assert settings.database_label is None


@pytest.mark.parametrize(
    "value",
    [
        FAKE_URL,
        " ",
        "preview ",
        "null",
        "123",
        "true",
        '{"a": 1}',
        "[1, 2]",
        "café ☃",
        "x" * 10_000,
    ],
)
def test_building_settings_never_raises_for_any_value(monkeypatch, value):
    monkeypatch.setenv("DATABASE_URL", value)
    monkeypatch.setenv("DATABASE_LABEL", value)

    settings = Settings(_env_file=None)

    assert settings.database_url is not None
    assert settings.database_label == value


@pytest.fixture
def dot_env_dir(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> Path:
    (tmp_path / ".env").write_text(
        f"DATABASE_URL={FAKE_URL}\nDATABASE_LABEL=preview\nUNRELATED_KEY=1\n"
    )
    monkeypatch.chdir(tmp_path)
    return tmp_path


def test_settings_read_the_dot_env_file_off_vercel(dot_env_dir):
    settings = get_settings()

    assert settings.database_url is not None
    assert settings.database_url.get_secret_value() == FAKE_URL
    assert settings.database_label == "preview"


def test_settings_ignore_the_dot_env_file_on_vercel(dot_env_dir, monkeypatch):
    monkeypatch.setenv("VERCEL", "1")

    settings = get_settings()

    assert settings.database_url is None
    assert settings.database_label is None


def test_environment_wins_over_the_dot_env_file(dot_env_dir, monkeypatch):
    monkeypatch.setenv("DATABASE_LABEL", "production")

    assert get_settings().database_label == "production"


def test_empty_dot_env_values_are_treated_as_unset(tmp_path, monkeypatch):
    # .env.example copied to .env without filling it in.
    (tmp_path / ".env").write_text("DATABASE_URL=\nDATABASE_LABEL=\n")
    monkeypatch.chdir(tmp_path)

    settings = get_settings()

    assert settings.database_url is None
    assert settings.database_label is None


def test_get_settings_is_cached():
    assert get_settings() is get_settings()
