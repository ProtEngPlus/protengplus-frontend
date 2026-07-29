# Contributing

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>

[optional body]
```

**type** (required):
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation only
- `refactor` — code change that neither fixes a bug nor adds a feature
- `perf` — performance improvement
- `test` — adding or correcting tests
- `build` — build system, dependencies
- `ci` — CI/CD config
- `chore` — everything else (tooling, config, housekeeping)
- `revert` — reverts a previous commit

**scope** (optional): area of the codebase affected, e.g. `feat(auth): ...`, `fix(conductor): ...`

**summary**: imperative mood, lowercase, no trailing period. e.g. `fix: reconnect rabbitmq on dial failure`

Breaking changes: add `!` after type/scope (`feat!: ...`) or a `BREAKING CHANGE:` footer in the body.

## Branches

- `main` — stable, deployable
- `dev` — integration branch, merge feature branches here first
- feature branches: `<type>/<short-description>`, e.g. `feat/lab-results-name`, `fix/mutation-download`

## Pull requests

Use the PR template. Keep PRs scoped to one concern where possible. Squash-merge or use a clean merge commit — avoid merge-commit noise from repeatedly merging `dev` back into a long-lived feature branch.

## Pre-commit hooks

This repo uses [husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged) (installed automatically by `npm install`, see [SETUP.md](./SETUP.md)):

- **pre-commit**: `eslint --fix` on staged `.js/.jsx/.ts/.tsx` files
- **pre-push**: `npm run build` (catches type errors before pushing)
- **commit-msg**: `commitlint` rejects commits that don't follow the Conventional Commits format above

Run lint manually against everything: `npm run lint:fix`
