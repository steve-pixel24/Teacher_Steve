# Backend

This folder holds the Teacher Steve backend: a FastAPI app in Python 3.13, managed with uv. So far it has one route, `/api/health`. It reports whether the backend runs, whether it reaches its Supabase database, and which project that is (`preview` or `production`).

What's here:

- `app/main.py`: the app and its routes. Every path starts with `/api`.
- `app/settings.py`: reads `DATABASE_URL` and `DATABASE_LABEL` from the environment, and locally from an optional `.env` file.
- `app/database.py`: the database check behind the health route.
- `tests/`: pytest tests. They never touch a database.
- `pyproject.toml` and `uv.lock`: dependencies, tool settings, and the exact installed versions.
- `.python-version`: the Python version uv uses.
- `.env.example`: the local settings file to copy to `.env`, with empty values.

To install and run the backend, follow [Run the backend](../README.md#run-the-backend) in the root README. Run every uv command from this folder.
