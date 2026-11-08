# Frontend

This folder holds the Teacher Steve app: React and TypeScript, built with Vite and styled with Tailwind CSS. Everything the app saves stays in the browser's localStorage. When the app loads, it calls the backend's health URL once and writes the reply to the browser console.

What's here:

- `index.html`: the page Vite serves. It loads `src/main.tsx`.
- `src/components/`: the screens and their parts.
- `src/data/`: lesson content, such as vocabulary, grammar, stories, and tests.
- `src/utils/`: shared logic, such as progress, XP, and achievements. `health.ts` makes the health call.
- `package.json` and `package-lock.json`: dependencies, npm scripts, and the exact installed versions.
- `vite.config.js`: dev server and build settings. The dev server forwards `/api` requests to the backend on port 8005.
- `tsconfig.json`: TypeScript settings.

To install, run, and build the app, follow [Run the frontend](../README.md#run-the-frontend) in the root README. Run every npm command from this folder.
