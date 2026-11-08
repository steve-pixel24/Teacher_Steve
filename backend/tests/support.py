"""Fake credentials and leak checks shared by the backend tests."""

import psycopg

FAKE_USER = "postgres.fakeproject"
FAKE_PASSWORD = "hunter2-not-a-real-password"
FAKE_HOST = "aws-0-fake-region.pooler.example.com"
FAKE_URL = f"postgresql://{FAKE_USER}:{FAKE_PASSWORD}@{FAKE_HOST}:6543/postgres"
FAKE_ERROR_TEXT = "boom-secret-error-text"
SECRET_PARTS = (FAKE_URL, FAKE_USER, FAKE_PASSWORD, FAKE_HOST, FAKE_ERROR_TEXT)


def assert_no_secret_parts(text: str) -> None:
    for part in SECRET_PARTS:
        assert part not in text


async def fail_to_connect(*args, **kwargs):
    """Stand-in for psycopg's connect that fails with every secret in its message."""
    raise psycopg.OperationalError(
        f"connection to server at {FAKE_HOST} failed: {FAKE_ERROR_TEXT} "
        f"for user {FAKE_USER} password {FAKE_PASSWORD}"
    )
