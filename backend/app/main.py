"""The FastAPI app. Every path lives under /api."""

import os
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, FastAPI, Response
from pydantic import BaseModel

from app.database import DatabaseCheck, DatabaseStatus, get_database_check
from app.settings import Settings, get_settings

ProjectWord = Literal["preview", "production", "not_configured"]


class HealthReply(BaseModel):
    backend: Literal["ok"]
    database: DatabaseStatus
    project: ProjectWord


def project_word(label: str | None) -> ProjectWord:
    """Map the configured label to one of the allowed words."""
    match label:
        case "preview" | "production":
            return label
        case _:
            return "not_configured"


router = APIRouter(prefix="/api")


@router.get("/health")
async def health(
    response: Response,
    settings: Annotated[Settings, Depends(get_settings)],
    check_database: Annotated[DatabaseCheck, Depends(get_database_check)],
) -> HealthReply:
    """Report whether the backend runs and whether it reaches its database.

    Always answers 200 with status words only, and never a key, a secret, or
    an address.
    """
    response.headers["Cache-Control"] = "no-store"

    database_url = settings.database_dsn
    if database_url is None:
        # Without a connection string there is no project to name either.
        return HealthReply(
            backend="ok", database="not_configured", project="not_configured"
        )

    return HealthReply(
        backend="ok",
        database=await check_database(database_url),
        project=project_word(settings.database_label),
    )


def create_app() -> FastAPI:
    # The interactive docs stay off in production, where they would show every
    # route to anyone. Previews and local runs keep them.
    docs_enabled = os.environ.get("VERCEL_ENV") != "production"
    app = FastAPI(
        docs_url="/api/docs" if docs_enabled else None,
        redoc_url="/api/redoc" if docs_enabled else None,
        openapi_url="/api/openapi.json" if docs_enabled else None,
    )
    app.include_router(router)
    return app


app = create_app()
