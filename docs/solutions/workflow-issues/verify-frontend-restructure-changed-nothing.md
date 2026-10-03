---
title: Verify a frontend restructure changed nothing
date: 2026-10-02
category: workflow-issues
module: frontend/ build and dev server
problem_type: workflow_issue
component: frontend
severity: medium
applies_when:
  - Moving or restructuring a frontend app (for example into a subfolder) in a repo with no automated tests
  - Removing npm packages and needing proof the app still installs, typechecks, and builds from scratch
  - Comparing built dist output against a pre-change baseline to show a refactor changed nothing
  - Tailwind v4 runs through @tailwindcss/vite and the CSS entry imports tailwindcss without a source() path
  - Smoke-testing the Vite dev server with a temporary config while the user may have their own dev server running
symptoms:
  - frontend/ typechecks and builds in an existing clone or nested worktree even though its own node_modules was never installed
  - Built JS file name (index-<hash>.js) changes while its SHA-256 content checksum is identical
  - Six Tailwind classes (backdrop-filter, invisible, isolate, shadow, static, visible) disappear from the built CSS after the move
  - Vite config bundling fails with TypeError (0 , import_vite2.default) is not a function when the temp config lives outside frontend/
  - A pkill -f pattern meant for a smoke-test server also killed the user's own dev server
resolution_type: workflow_improvement
related_components:
  - development_workflow
  - tooling
tags: [behavior-preserving-refactor, build-verification, vite, tailwind-v4, node-modules, fresh-clone, asset-hash, dev-server]
---

# Verify a frontend restructure changed nothing

## Context

PR #7 (merged 2026-10-02) moved the Teacher Steve app from the repo root into `frontend/`. The app uses React 18, TypeScript 5.9.3, Vite 6.4.3, and Tailwind 4.3.3. The same PR deleted `public/index.html`, an old single-file copy of the app, and removed 13 unused npm packages. No file under `frontend/src/` changed. The move commit shows all 56 moved files as `R100` renames.

The app has no automated tests. `npm run typecheck` is the only check. So the claim "the app did not change" had to be proven another way: by comparing build output with `main`. The plan's Verification Contract lists those checks (`docs/plans/2026-09-27-1721-refactor-monorepo-fastapi-supabase-rebuild-plan.md`, the `### PR2` table under `## Verification Contract`). The plan's PR1 (PR #2) ran the same kind of checks from the repo root.

Three things made the obvious checks give wrong answers. One gave a false pass. One gave a false alarm. One was an expected difference that looked like a regression.

## Guidance

### 1. Record a baseline from main first, in a fresh clone outside the repo

Before changing anything, build `main` in a fresh clone under `/tmp` and record four things:

- the SHA-256 of the built JS file's contents,
- the sorted list of class selectors in the built CSS,
- the type-check output,
- the versions of the packages you keep.

Every later check compares against these files. Run the PR side the same way, in its own fresh clone.

### 2. Trap 1 (false pass): a parent `node_modules/` hides a broken install

`.gitignore:1` ignores `node_modules/`, and `.gitignore:3` ignores `dist/`. So the root copies survive the move in any existing clone, and the root `node_modules/` keeps packages the PR removed, such as `@supabase/supabase-js` and `framer-motion`. From inside `frontend/`, three tools find packages in that parent folder:

- `npm run` puts `node_modules/.bin` from every parent folder on `PATH`. See `@npmcli/run-script` 10.0.4, `lib/set-path.js:27-36` (bundled with npm 11.19.0).
- Node and Vite resolve bare imports by walking up parent folders. That covers the plugin imports at `frontend/vite.config.js:2-3` and Tailwind's `@import "tailwindcss"` at `frontend/src/index.css:1`.
- TypeScript adds `node_modules/@types` from every parent folder as a type root (`getDefaultTypeRoots`, `frontend/node_modules/typescript/lib/typescript.js:44262`, TypeScript 5.9.3). `frontend/tsconfig.json` sets neither `types` nor `typeRoots`, so this applies.

So `npm run dev`, `npm run build`, and `npm run typecheck` can pass inside `frontend/` with no `frontend/node_modules/`, or with a needed package removed. This happens in an existing clone. It also happens in a git worktree nested inside the repo folder.

What to do:

- Run every check in a fresh `git clone` outside the repo folder, for example under `/tmp`.
- Before installing, confirm that no parent folder has a `node_modules/`.
- Before installing, confirm that `npm run build` fails. If it passes, packages are leaking in from somewhere.
- Existing clones should delete the root `node_modules/` and `dist/`, then run `npm install` in `frontend/`. The plan's Operational Notes say the same.

### 3. Trap 2 (false alarm): the JS file name changed, the contents did not

`main` built `index-CEZ8jyAm.js`. The PR branch built `index-BPDdVidW.js`. Per PR #7's verification, both files had the same SHA-256: `e5b90c9f0b53ac60918cfc4840ee419ada4a2d9c0f213309a266d3b200485692`.

The cause is Vite's `vite:css-post` plugin. Its `augmentChunkHash` hook returns the file names of the CSS files the chunk imports, joined together (`frontend/node_modules/vite/dist/node/chunks/dep-Dm0c1Wj2.js:43506`, Vite 6.4.3). Vite mixes that string into the JS chunk's hash. The names come from `this.getFileName(referenceId)` at line 43465, and each name carries the CSS content hash. So any CSS change renames the JS file, even when the JS bytes are identical. The CSS did change here by design (trap 3).

What to do: compare `shasum -a 256` of the JS contents. Never compare file names.

### 4. Trap 3 (expected diff): Tailwind's scan folder moved with Vite's root

`frontend/src/index.css:1` is `@import "tailwindcss";`. It has no `source()` and there is no `@source`. So `@tailwindcss/vite` 4.3.3 scans Vite's root folder. In `frontend/node_modules/@tailwindcss/vite/dist/index.mjs` (minified, one line), the plugin creates each CSS root with `new z(i,e.root,...)`, where `e` is the resolved Vite config. When `compiler.root` is null, the scanner gets `{base:this.base,pattern:"**/*"}`. `frontend/vite.config.js` sets no `root`, so Vite's root is the folder Vite runs in.

Before the move, that folder was the whole repo, including `docs/` and `public/index.html`. Tailwind generated utilities for words that appeared only in markdown or in the old single-file app. `main`'s built CSS contained `.backdrop-filter`, `.invisible`, `.isolate`, `.shadow`, `.static`, and `.visible`, words that appear in `docs/legacy/*.md` and in the plan itself. Per PR #7's verification, those six classes dropped after the move.

None of them is used in `frontend/src/`:

- `invisible`, `isolate`, `static`, and `visible` do not appear there at all.
- `shadow` and `backdrop-filter` appear only as hand-written CSS in `index.css`. Examples: `--card-shadow` at `frontend/src/index.css:38`, `box-shadow` at line 129, and `backdrop-filter: blur(8px)` at line 310.
- Every class that `src/` builds at runtime maps to hand-written CSS. `callout-${block.variant}` (`frontend/src/components/ContentRenderer.tsx:53`) maps to `.callout-*` (`frontend/src/index.css:313` onward). The `tag-*` names in `frontend/src/components/LessonPlayer.tsx:234-240` map to `.tag-*` (`frontend/src/index.css:223-229`).

What to do:

- Diff the class selectors of the two builds.
- Check that each removed class is absent from the files Tailwind scans for class names in `frontend/`.
- Build twice and confirm the CSS is byte-identical.
- Remember that `frontend/README.md` is now inside the scan folder, so words in it can add utilities. Per PR #7's check, none did.

### 5. Prove the move is a pure rename

Put the move in a commit with nothing else in it, then check that commit alone. In PR #7 the move commit shows every file as `R100`. The whole-PR diff shows `package-lock.json` as `R075` and `vite.config.js` as `R088`, because later commits in the PR edited them. That is expected, and it is why you check the move commit by itself. `git log --follow` on a file under `frontend/src/` should show commits from before the move. PR #2 is the counter-example: its report move deleted and re-added files, so their history did not follow them.

### 6. Smoke-test the dev server without touching the user's server

`frontend/vite.config.js:10` sets `strictPort: true`, so Vite exits if its port is taken. Leave the user's server alone. Run Vite with a throwaway override config placed inside `frontend/`. It imports `./vite.config.js` and overrides `server.port` and `server.hmr.port`. In PR #7's verification, an override placed outside `frontend/` failed with `TypeError: (0 , import_vite2.default) is not a function`, because its imports did not resolve from `frontend/node_modules/`.

Request both `/` and `/index.html`. Vite registers `servePublicMiddleware` (`dep-Dm0c1Wj2.js:38847`) before `htmlFallbackMiddleware` (line 38853) and `indexHtmlMiddleware` (line 38857), so a file in `public/` beats the HTML fallback. On `main`, `/index.html` served the old `public/index.html` app while `/` served React. After the deletion, both serve React.

Stop only the processes you started, by PID. During a follow-up port check after PR #7, `pkill -f ".../frontend/node_modules/.bin/vite"` also killed the maintainer's own dev server, because the pattern matched it too. Start Vite directly, not through `npm run`, so `$!` is the server's own PID.

### 7. What stays manual

Headless browser rendering (Brave `--headless --dump-dom`) did not work in this macOS agent environment. A manual click-through stays the reviewer's job. The Verification Contract's dev-server row lists what to click through: login, teacher student management, one activity each in vocabulary, grammar, stories, tests, and games, and a page reload to check saved data.

The dev server now runs on port 3005 (`frontend/vite.config.js:9` for `port`, line 12 for `hmr.port`). Browsers keep localStorage per origin, so the app starts with no saved data on the new port. That is expected, not a regression. Data saved on port 3000 stays in the browser under that origin.

## Why This Matters

With no tests, build output is the only evidence that the app is unchanged. Each trap breaks that evidence in a different way:

- Trap 1 makes a broken install look fine. A package removal that breaks the app passes every local check. It fails later, on the next fresh clone or the first deploy.
- Trap 2 makes identical JS look changed. A reviewer who compares file names chases a regression that does not exist.
- Trap 3 makes a harmless CSS diff look like a regression. Without the class-by-class check, you cannot tell a utility nobody used from a utility a screen needs.

A fresh clone, a content checksum, and a class diff turn all three into yes-or-no answers.

## When to Apply

- Moving an app into a subfolder, or changing what folder Vite runs in.
- Removing npm packages, or changing what the lock file installs.
- Deleting files under `public/`, or anywhere inside a Tailwind scan folder, including docs and markdown.
- Any "no behavior change" refactor in a repo without automated tests.
- Checking work in a git worktree inside the repo folder, or in any clone with a `node_modules/` in a parent folder.

## Examples

### Baseline from main

Before PR #7, `package.json` sat at the repo root. For a later baseline, `cd` into `frontend/` instead.

```bash
REPO=https://github.com/steve-pixel24/Teacher_Steve.git
OUT=/tmp/ts-verify
mkdir -p "$OUT"

git clone --quiet --branch main "$REPO" /tmp/ts-main
cd /tmp/ts-main          # after PR #7: cd /tmp/ts-main/frontend
npm ci

npm run --silent typecheck > "$OUT/typecheck-main.txt" 2>&1
echo "exit $?" >> "$OUT/typecheck-main.txt"

npm run build
shasum -a 256 dist/assets/*.js | awk '{print $1}' > "$OUT/js-main.sha256"
grep -oE '\.[A-Za-z_-]([A-Za-z0-9_-]|\\.)*' dist/assets/*.css | sort -u > "$OUT/classes-main.txt"

for p in react react-dom vite tailwindcss @tailwindcss/vite @vitejs/plugin-react typescript @types/react @types/react-dom; do
  printf '%s %s\n' "$p" "$(node -p "require('./node_modules/$p/package.json').version")"
done > "$OUT/versions-main.txt"
```

`--silent` hides npm's `> name@version script` banner. Without it, the package rename alone shows up in the type-check diff. The class regex also catches a few non-selectors, such as `.com` from a URL. Both sides use the same regex, so that noise cancels out in the diff.

### Fresh PR clone, with guards against trap 1

```bash
git clone --quiet --branch refactor/pr2-move-frontend "$REPO" /tmp/ts-pr
cd /tmp/ts-pr/frontend

# No parent folder may hold a node_modules/. pwd -P follows macOS's /tmp -> /private/tmp link.
d=$(pwd -P)
while [ "$d" != / ]; do
  d=$(dirname "$d")
  [ -d "$d/node_modules" ] && echo "STOP: found $d/node_modules"
done

# Before the install, the build must fail.
npm run build > /dev/null 2>&1 && echo "STOP: build passed with no install"

npm ci
```

### Compare JS by contents, not by name (trap 2)

```bash
npm run build
ls dist/assets/          # the JS name may differ from main's; that is fine
shasum -a 256 dist/assets/*.js | awk '{print $1}' | diff "$OUT/js-main.sha256" - && echo "JS contents identical"
```

### Diff CSS classes and confirm removed ones are unused (trap 3)

```bash
grep -oE '\.[A-Za-z_-]([A-Za-z0-9_-]|\\.)*' dist/assets/*.css | sort -u > "$OUT/classes-pr.txt"
diff "$OUT/classes-main.txt" "$OUT/classes-pr.txt"

# Each class main had and the PR lost must not be named in the files Tailwind
# scans for class names. -w treats "-" as a word boundary, so hits can be
# false positives; check any hit by hand.
comm -23 "$OUT/classes-main.txt" "$OUT/classes-pr.txt" | sed 's/^\.//; s/\\//g' | while read -r c; do
  grep -rnwF --include='*.ts' --include='*.tsx' --include='*.html' --include='*.md' -- "$c" src index.html README.md \
    && echo "CHECK: $c is named above"
done
```

For PR #7 the removed list was `backdrop-filter`, `invisible`, `isolate`, `shadow`, `static`, and `visible`. Five of them print nothing. `shadow` prints hits in about eight component files, all inline-style CSS such as `box-shadow`, `boxShadow`, `var(--card-shadow)`, and `drop-shadow(...)`. None is a `shadow` class name, so none keeps the utility alive. `index.css` is left out on purpose: it names `box-shadow` and `backdrop-filter` as CSS properties, and those did not keep the utilities alive either.

### Build twice, CSS must match

```bash
npm run build && shasum -a 256 dist/assets/*.css > "$OUT/css-1.txt"
npm run build && shasum -a 256 dist/assets/*.css > "$OUT/css-2.txt"
diff "$OUT/css-1.txt" "$OUT/css-2.txt" && echo "CSS builds identical"
```

### Type check and kept versions

```bash
npm run --silent typecheck > "$OUT/typecheck-pr.txt" 2>&1
echo "exit $?" >> "$OUT/typecheck-pr.txt"
diff "$OUT/typecheck-main.txt" "$OUT/typecheck-pr.txt" && echo "typecheck output matches"

for p in react react-dom vite tailwindcss @tailwindcss/vite @vitejs/plugin-react typescript @types/react @types/react-dom; do
  printf '%s %s\n' "$p" "$(node -p "require('./node_modules/$p/package.json').version")"
done | diff "$OUT/versions-main.txt" - && echo "kept versions match"
```

The version loop reads `./node_modules/<pkg>/package.json` by path. A package missing from `frontend/node_modules/` then fails loudly instead of resolving from a parent folder.

### Dev-server smoke test on a spare port

```bash
cd /tmp/ts-pr/frontend
lsof -nP -iTCP:3005 -sTCP:LISTEN     # see who holds 3005, and leave it alone

# The override must live inside frontend/ so its imports resolve from frontend/node_modules/.
cat > vite.smoke.config.js <<'EOF'
import base from "./vite.config.js";
export default {
  ...base,
  server: { ...base.server, port: 3105, hmr: { ...base.server.hmr, port: 3105 } },
};
EOF

./node_modules/.bin/vite --config vite.smoke.config.js > "$OUT/vite.log" 2>&1 &
VITE_PID=$!
for i in 1 2 3 4 5 6 7 8 9 10; do
  curl -sf -o /dev/null http://localhost:3105/ && break
  sleep 1
done

# Both should print 1: the React shell loads /src/main.tsx. On main, /index.html printed 0.
curl -s http://localhost:3105/ | grep -c '/src/main.tsx'
curl -s http://localhost:3105/index.html | grep -c '/src/main.tsx'

kill "$VITE_PID"          # only the server this script started
rm vite.smoke.config.js
```

### Clean up an existing clone after the move

```bash
cd /path/to/your/clone       # the repo root
rm -rf node_modules dist     # gitignored leftovers from before PR #7
cd frontend && npm install
```

Stop the old dev server before pulling. It serves the old root layout, which the pull removes.

## Related

- `docs/plans/2026-09-27-1721-refactor-monorepo-fastapi-supabase-rebuild-plan.md`: the PR2 Verification Contract and Operational Notes these checks come from.
- PR #7: the move into `frontend/` this learning was verified on. PR #2 is the earlier report move whose history did not follow.
- Issue #4 (PR3): adds automatic checks on pull requests with `frontend/` as the working directory. CI runs in a fresh checkout, which removes trap 1 there but not on local clones.
