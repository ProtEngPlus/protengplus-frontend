# Setup

## Run locally

1. **Copy the env file**
   ```sh
   cp .env.example .env.local
   ```
   Fill in real values. Done when: `.env.local` exists with real values.

2. **Install dependencies**
   ```sh
   npm install
   ```
   This also installs husky's git hooks via the `prepare` script. Done when: exits 0, no errors.

3. **Run the dev server**
   ```sh
   npm run dev
   ```
   Done when: Vite prints a local URL and the app loads in the browser.

## Format & lint

ESLint handles both, autofixing on commit via lint-staged. Run manually against the whole repo:

```sh
npm run lint:fix
```

Type errors are caught separately by `npm run build` (also what runs on `git push`).

## Pre-commit hooks

Installed automatically by `npm install` via [husky](https://typicode.github.io/husky/) + lint-staged. See [CONTRIBUTING.md](./CONTRIBUTING.md) for what runs on commit vs. push vs. commit-msg.

## API docs

This app only talks to proteng-bff (`VITE_BACKEND_BASE_URL`) — API docs live on bff's Swagger UI: `http://localhost:8080/swagger/index.html` (see `proteng-bff/SETUP.md`).
