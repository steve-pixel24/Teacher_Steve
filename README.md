# Teacher Steve

Teacher Steve is an English-learning app for Steve's students. Students practice vocabulary, grammar, stories, tests, and games. Steve, the teacher, has a screen for creating and managing student accounts.

## Status

The repo is in the middle of a rebuild. Today it is **frontend only**:

- Everything the app saves (students, progress, achievements, feedback) lives in the browser's localStorage, so it stays on one browser on one device.
- There is no backend or database yet.
- The app is not deployed.

The [rebuild plan](docs/plans/2026-09-27-1721-refactor-monorepo-fastapi-supabase-rebuild-plan.md) describes what comes next, one pull request at a time, in its [Delivery Sequence](docs/plans/2026-09-27-1721-refactor-monorepo-fastapi-supabase-rebuild-plan.md#delivery-sequence).

## Stack

What the repo uses today:

- [React](https://react.dev/) 18 with [TypeScript](https://www.typescriptlang.org/) 5 for the app
- [Vite](https://vite.dev/) 6 for the dev server and the production build
- [Tailwind CSS](https://tailwindcss.com/) 4 for styling

Planned, not in the repo yet:

- [FastAPI](https://fastapi.tiangolo.com/) for the backend (Python)
- [Supabase](https://supabase.com/) for the database and accounts
- [Vercel](https://vercel.com/) for hosting

## Repo layout

```text
README.md              this file
.gitignore             files git never tracks, such as node_modules/ and dist/
docs/plans/            the rebuild plan
docs/legacy/           old AI-generated reports, kept for reference; they don't match the code
frontend/              the React app
  index.html           the page Vite serves; it loads src/main.tsx
  src/                 the app's code: components/, data/ (lesson content), utils/
  package.json         dependencies and npm scripts
  package-lock.json    exact versions of every installed package
  vite.config.js       dev server and build settings
  tsconfig.json        TypeScript settings
backend/               placeholder; the FastAPI backend arrives in PR3
```

## Run the frontend

You need [Node.js](https://nodejs.org/) 22 or newer, which comes with npm. Check with `node --version`. Node 20 reached end of life in April 2026, so 22 is the oldest version still supported.

Run every npm command from the `frontend/` folder. The repo root has no `package.json`, so npm commands fail there.

```bash
cd frontend
npm install         # install dependencies into frontend/node_modules/
npm run dev         # start the dev server at http://localhost:3000
```

Other commands, also from `frontend/`:

```bash
npm run build       # production build into frontend/dist/
npm run typecheck   # check TypeScript types without building
```

Things you may notice:

- The dev server listens on every network interface, so a phone on the same Wi-Fi can open `http://<your-computer's-IP>:3000`.
- If port 3000 is already in use, the dev server exits with an error instead of picking another port. Stop whatever holds the port, or change both `port` and `hmr.port` under `server` in `frontend/vite.config.js`. Changing only `port` breaks live reload, because the live-reload connection still uses port 3000.
- `npm install` may print a warning that `esbuild` and `fsevents` have install scripts that haven't been approved. The app still installs and runs.
- `npm run build` warns that the main JavaScript file is larger than 500 kB. That is expected for now.

## For Python developers

The JavaScript files in this table live in `frontend/`.

| JavaScript side | Closest Python equivalent |
|---|---|
| Node.js | the Python interpreter |
| npm | pip |
| `package.json` | `pyproject.toml` (dependencies plus scripts) |
| `package-lock.json` | a lock file such as `uv.lock` or `poetry.lock` |
| `node_modules/` | a virtualenv's installed packages, kept inside the project |
| `npm run <script>` | a Makefile target |
| `npm run typecheck` (`tsc --noEmit`) | mypy |

## Checks

There are no automated tests yet. `npm run typecheck`, run from `frontend/`, is the only check, and nothing runs it automatically on pull requests, so run it yourself before opening one.

## Logging in locally

The teacher login is hardcoded in `frontend/src/components/LoginScreen.tsx` until real accounts replace it in PR4. Log in as the teacher to create students. Each student gets a 4-digit code to log in with.

Everything stays in the current browser's localStorage. Clearing the site's data or switching browsers starts from nothing.

## Deploy

The app is not deployed yet. PR3 adds deployment to Vercel.
