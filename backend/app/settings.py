"""Settings from the environment and, off Vercel, an optional .env file."""

import os
from functools import lru_cache

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Both values are plain optional strings, so building the settings never
    # raises for any value. The label is compared in code, not validated here.
    model_config = SettingsConfigDict(
        # An empty value, as copied from .env.example, counts as unset.
        env_ignore_empty=True,
        # A .env file may hold keys this app doesn't read.
        extra="ignore",
        # If validation ever fails, its error never repeats the input values.
        hide_input_in_errors=True,
    )

    # The Supabase transaction pooler connection string. SecretStr keeps it out
    # of repr, str, and logs.
    database_url: SecretStr | None = None
    # "preview" or "production". Anything else reports as not configured.
    database_label: str | None = None

    @property
    def database_dsn(self) -> str | None:
        """The connection string as plain text, or None when missing or blank."""
        if self.database_url is None:
            return None
        return self.database_url.get_secret_value().strip() or None


@lru_cache
def get_settings() -> Settings:
    """The app's settings, read once. Used as a FastAPI dependency.

    The environment wins. An optional .env file, relative to the working
    directory, fills gaps, but only off Vercel, where the dashboard owns every value.
    """
    return Settings(_env_file=None if "VERCEL" in os.environ else ".env")
