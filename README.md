# Teacher Steve

Teacher Steve is an English-learning app for Steve's students. Students practice vocabulary, grammar, stories, tests, and games. Steve, the teacher, has a screen for creating and managing student accounts.

## Status

The repo is in the middle of a rebuild. Today:

- The app is live at https://teacher-steve.vercel.app. That is its only public address.
- Everything the app saves (students, progress, achievements, feedback) still lives in the browser's localStorage, so it stays on one browser on one device.
- The backend has one route so far, a health check. It proves the frontend, the backend, and the database work together. Real accounts arrive in PR4.

The [rebuild plan](docs/plans/2026-09-27-1721-refactor-monorepo-fastapi-supabase-rebuild-plan.md) describes what comes next, one pull request at a time, in its [Delivery Sequence](docs/plans/2026-09-27-1721-refactor-monorepo-fastapi-supabase-rebuild-plan.md#delivery-sequence).

## Stack

- [React](https://react.dev/) 18 with [TypeScript](https://www.typescriptlang.org/) 5 for the app
- [Vite](https://vite.dev/) 6 for the dev server and the production build
- [Tailwind CSS](https://tailwindcss.com/) 4 for styling
- [FastAPI](https://fastapi.tiangolo.com/) on Python 3.13 for the backend, managed with [uv](https://docs.astral.sh/uv/)
- [Supabase](https://supabase.com/) for the Postgres database
- [Vercel](https://vercel.com/) for hosting both parts
- [GitHub Actions](https://docs.github.com/en/actions) for checks and deploys

## Repo layout

```text
README.md                this file
.gitignore               files git never tracks, such as node_modules/, .venv/, and .env
.vercelignore            files `vercel deploy` never uploads, such as .env
vercel.json              tells Vercel to run frontend/ and backend/ as one project, with the backend under /api
.github/workflows/ci.yml the checks and deploys that run on GitHub
docs/plans/              the rebuild plan and one plan per pull request
docs/solutions/          lessons learned while building
docs/legacy/             old AI-generated reports, kept for reference; they don't match the code
frontend/                the React app
  index.html             the page Vite serves; it loads src/main.tsx
  src/                   the app's code: components/, data/ (lesson content), utils/
  package.json           dependencies and npm scripts
  package-lock.json      exact versions of every installed package
  vite.config.js         dev server and build settings
  tsconfig.json          TypeScript settings
backend/                 the FastAPI backend
  app/                   the app: main.py (routes), settings.py, database.py
  tests/                 pytest tests
  pyproject.toml         dependencies and tool settings
  uv.lock                exact versions of every installed package
  .python-version        the Python version, 3.13
  .env.example           the local settings file to copy, with empty values
```

## Run the frontend

You need [Node.js](https://nodejs.org/) 22 or newer, which comes with npm. Check with `node --version`. Node 20 reached end of life in April 2026, so 22 is the oldest version still supported.

Run every npm command from the `frontend/` folder. The repo root has no `package.json`, so npm commands fail there.

```bash
cd frontend
npm install         # install dependencies into frontend/node_modules/
npm run dev         # start the dev server at http://localhost:3005
```

Other commands, also from `frontend/`:

```bash
npm run build       # production build into frontend/dist/
npm run typecheck   # check TypeScript types without building
```

Things you may notice:

- The dev server listens on every network interface, so a phone on the same Wi-Fi can open `http://<your-computer's-IP>:3005`.
- If port 3005 is already in use, the dev server exits with an error instead of picking another port. Stop whatever holds the port, or change both `port` and `hmr.port` under `server` in `frontend/vite.config.js`. Changing only `port` breaks live reload, because the live-reload connection still uses port 3005.
- `npm install` may print a warning that `esbuild` and `fsevents` have install scripts that haven't been approved. The app still installs and runs.
- `npm run build` warns that the main JavaScript file is larger than 500 kB. That is expected for now.
- When the app loads, it calls the backend's health URL once and writes the reply to the browser console. If the backend isn't running, the dev server prints `http proxy error: /api/health` and the console shows one warning. The app works the same either way.

## Run the backend

You need [uv](https://docs.astral.sh/uv/getting-started/installation/). Install it with `brew install uv` on a Mac, or with the installer on uv's site. You don't need to install Python yourself: uv downloads Python 3.13 the first time you run the backend.

Run every uv command from the `backend/` folder.

```bash
cd backend
uv run fastapi dev --port 8005   # install dependencies and start the backend at http://127.0.0.1:8005
```

Open http://127.0.0.1:8005/api/health. With no settings it answers `{"backend":"ok","database":"not_configured","project":"not_configured"}`. The interactive API docs are at http://127.0.0.1:8005/api/docs. FastAPI's startup message points at `/docs`, but every backend path in this app starts with `/api`.

To run both parts together, start the backend first, then the frontend in a second terminal. The frontend's dev server forwards every `/api` request to the backend on port 8005, so the browser console at http://localhost:3005 shows the backend's health reply.

To connect a local backend to a database, copy the example settings file and fill it in with the **preview** Supabase project's values. Never use production's values on your machine.

```bash
cp .env.example .env   # .env is ignored by git and by vercel deploy
```

Set `DATABASE_URL` to the preview project's Transaction pooler connection string (port 6543, from **Connect** in the Supabase dashboard) and `DATABASE_LABEL` to `preview`. The health URL then answers `"database":"reachable","project":"preview"`.

Other commands, also from `backend/`:

```bash
uv run pytest            # run the backend tests; they never touch a database
uv run ruff check .      # lint
uv run ruff format .     # format the code
```

## For Python developers

The JavaScript files in this table live in `frontend/`. The backend in `backend/` is plain Python with `pyproject.toml` and `uv.lock`.

| JavaScript side | Closest Python equivalent |
|---|---|
| Node.js | the Python interpreter |
| npm | pip, or uv |
| `package.json` | `pyproject.toml` (dependencies plus scripts) |
| `package-lock.json` | a lock file such as `uv.lock` or `poetry.lock` |
| `node_modules/` | a virtualenv's installed packages, kept inside the project |
| `npm run <script>` | a Makefile target, or `uv run <command>` |
| `npm run typecheck` (`tsc --noEmit`) | mypy |

## Checks

GitHub Actions runs two checks on every pull request and on every push to `main`. You can run the same commands yourself:

| Check | Folder | Commands |
|---|---|---|
| `backend` | `backend/` | `uv run pytest`, `uv run ruff check .`, `uv run ruff format --check .` |
| `frontend` | `frontend/` | `npm ci`, `npm run typecheck`, `npm run build` |

The same workflow has two deploy jobs, `preview` and `production`, described under Deploy.

Nothing blocks a merge, so it's up to you:

- Don't merge a pull request while a check or its `preview` job is red.
- After every merge, watch the run on `main` in the repo's **Actions** tab. GitHub emails only the person whose push started a failed run, so also check the runs that Steve's own commits to `main` start.
- A red `production` job that failed before its "Go live" step changed nothing for students. One that failed after it means the new version is live and broken: see "If production breaks" below.

## Logging in locally

The teacher login is hardcoded in `frontend/src/components/LoginScreen.tsx` until real accounts replace it in PR4. The deployed app uses the same login. Log in as the teacher to create students. Each student gets a 4-digit code to log in with.

Everything stays in the current browser's localStorage. Clearing the site's data or switching browsers starts from nothing.

## Deploy

The app runs on Vercel at https://teacher-steve.vercel.app. GitHub Actions deploys it with the Vercel CLI. The Vercel project has no Git connection, because only the GitHub repo's owner could connect it, so Vercel never deploys on its own.

- **A pull request becomes a preview.** The `preview` job deploys every PR from a branch in this repo, then checks that the preview's `/api/health` answers `ok`, `reachable`, `preview`. The preview's address is in the job's summary and in the PR's "View deployment" link. Previews sit behind Vercel's login, so only the maintainer's Vercel account can open them. PRs from forks and from Dependabot skip this job, because GitHub gives them no secrets.
- **A merge to `main` becomes production.** After both checks pass, the `production` job deploys without going live and checks the new deployment's health reply. Only then does it run `vercel promote`, which puts it on the production address, and it checks the public address once more. If the commit is no longer the tip of `main`, the job skips itself, so re-running an old run can't put old code back.

### What the deploy needs

These settings live outside the repo. If one gets lost, this list is how to rebuild it. No values are written here.

Vercel project `teacher-steve`, in the maintainer's Hobby account:

- Framework Preset **Services**, Root Directory `.`, Node.js **24.x**. The backend runs in Dublin (`dub1`).
- **Deployment Protection**: Standard Protection, so previews need a Vercel login and production is public.
- **Protection Bypass for Automation**: one secret, which lets GitHub Actions read a protected preview's health reply.
- **Firewall**: one rate-limit rule on `/api`, so nobody can burn through the free plan's limits.
- **Environment variables**:

  | Name | Production | Preview | Type |
  |---|---|---|---|
  | `DATABASE_URL` | production project's Transaction pooler string | preview project's Transaction pooler string | Sensitive |
  | `DATABASE_LABEL` | `production` | `preview` | plain |

  When you paste a `DATABASE_URL`, check that the user part, `postgres.<ref>`, matches the reference of the Supabase project you meant. The health check reports the label, so it can't catch two swapped strings.

Supabase, in the maintainer's account: two projects, one for previews and one for production, both in one region close to Vercel's Dublin region. Supabase can't move a project to another region later.

GitHub repo, under Settings, Secrets and variables, Actions:

| Name | Kind | What it is |
|---|---|---|
| `VERCEL_TOKEN` | secret | a Vercel access token from the maintainer's Account Settings, Tokens. It has an expiry date. Replace it before then, or deploys stop |
| `VERCEL_AUTOMATION_BYPASS_SECRET` | secret | the Protection Bypass for Automation secret |
| `VERCEL_ORG_ID` | variable | the Vercel account's ID, from `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | variable | the Vercel project's ID, from the same file |
| `PRODUCTION_URL` | variable | `https://teacher-steve.vercel.app` |

The Vercel token reaches the whole Vercel account, and anyone with write access to this repo could read it by editing the workflow. Add a collaborator with write access only if the maintainer agrees.

Keep only one `.vercelignore`, at the repo root. A second one in a subfolder would replace it, and a local `.env` could then be uploaded.

### Changing a setting

A deploy reads Vercel's environment variables when it builds. After changing one, re-run the latest `production` job in the Actions tab, or the `preview` job of an open PR.

### If production breaks

1. In the Vercel dashboard, open the project's Deployments and use **Instant Rollback**. The free plan can only go back one deployment, and rolling back doesn't undo changed environment variables.
2. Open a pull request that reverts or fixes the change, and merge it when its checks are green.
3. Its `production` job promotes the fix, which also ends the rollback. Until then, nothing merged to `main` goes live.

### If the health check says the database is unreachable

The free Supabase plan pauses a project after a week without database activity. The preview project pauses after any quiet week without pull requests, and production after a week without visitors. Open the project in the Supabase dashboard and choose **Restore project**. It takes a few minutes. Then re-run the red job.

### If the site answers 503 DEPLOYMENT_PAUSED

The Vercel account ran past the free plan's monthly limits. Vercel doesn't bill on the free plan: it pauses the project instead, for up to 30 days. Check the account's **Usage** page. If someone is flooding the site, turn on **Attack Mode** in the project's Firewall. Paused projects don't resume on their own, so follow the steps the Vercel dashboard shows.
