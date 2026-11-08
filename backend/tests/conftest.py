import logging

import pytest

from tests.support import assert_no_secret_parts


@pytest.fixture(autouse=True)
def assert_nothing_leaked(
    caplog: pytest.LogCaptureFixture, capfd: pytest.CaptureFixture
):
    """After every test, logs and output contain nothing from the fake credentials."""
    caplog.set_level(logging.DEBUG)
    yield
    captured = capfd.readouterr()
    assert_no_secret_parts(caplog.text + captured.out + captured.err)
