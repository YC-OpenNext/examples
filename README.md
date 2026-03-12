# Next-YC Examples

Next.js fixtures for validating one-command deployment with `next-yc deploy`.

## Examples

| Directory | Next.js | Focus |
|-----------|---------|-------|
| `next13-app-router` | 13.x | App Router, Server Components, streaming |
| `next14-mixed` | 14.x | Mixed routers, Middleware, Server Actions |
| `next15-modern` | 15.x | React 19, modern patterns |

Matrix source of truth: `compat-matrix.json` (validated in CI).
One-command flow source-of-truth check: `scripts/check-one-command-flow.mjs` (validated in CI).

## Standard Flow (per example)

```bash
npm install
next-yc deploy --project . --verbose
```

`next-yc deploy` runs app build automatically when `build` script exists.
Deploy is execution-enabled by default; use `--dry-run` for dry-run planning.

Each example now includes `next-yc-cfg.json` with runtime env placeholders.
