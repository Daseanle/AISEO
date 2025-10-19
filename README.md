# Monorepo (Turborepo + pnpm)

This repository is a Turborepo-powered monorepo managed with pnpm. It hosts application frontends/backends and shared packages under a single workspace with unified tooling for linting, formatting, and TypeScript.

## Tech stack
- Package manager: pnpm
- Orchestration: Turborepo
- Language: TypeScript
- Linting/Formatting: ESLint + Prettier

## Repository layout

```
.
├── apps
│   ├── api          # NestJS service (placeholder)
│   └── web          # Next.js app (placeholder)
├── packages
│   ├── shared       # Shared TypeScript utilities, types and configs
│   └── wp-plugin    # WordPress plugin (skeleton)
├── infra            # Infrastructure as code (Terraform, CDK, etc.)
├── turbo.json       # Turborepo task pipeline
├── pnpm-workspace.yaml
├── package.json     # Root scripts and shared devDependencies
├── tsconfig.base.json
├── .eslintrc.cjs
├── .prettierrc
└── .editorconfig
```

## Getting started

- Install pnpm if you don't have it: https://pnpm.io/installation
- Install dependencies at the repo root:

```bash
pnpm install
```

- Run scripts across the monorepo via Turborepo:

```bash
pnpm dev       # turbo run dev --parallel
pnpm build     # turbo run build
pnpm lint      # turbo run lint
pnpm test      # turbo run test
pnpm format    # prettier --check . (no-op formatting check)
```

Each workspace (apps/*, packages/*) exposes the same script names so Turborepo can orchestrate them consistently.

## TypeScript configuration

A shared base config lives in tsconfig.base.json and is extended by individual workspaces. Path alias `@shared/*` points to `packages/shared/src/*`.

## Linting & formatting

- ESLint configuration is defined at the root and applies to all workspaces, with scoped overrides for Next.js (apps/web) and NestJS (apps/api).
- Prettier is configured at the root. Run `pnpm format` to check formatting or `pnpm format:write` to apply formatting.

## Environment variables

- Each application should define its own `.env` file at the workspace root (e.g., `apps/web/.env`, `apps/api/.env`).
- Commit sanitized `.env.example` files to document required variables for each app.
- Never commit secrets. Use your team's secret management solution (e.g., 1Password, Vault, Doppler) or your hosting provider's environment manager.

Suggested pattern per app:

```
# apps/web/.env.example
NEXT_PUBLIC_API_URL=

# apps/api/.env.example
DATABASE_URL=
JWT_SECRET=
```

## Contribution workflow

1. Create a feature branch.
2. Install dependencies with `pnpm install`.
3. Make your changes and keep code formatted (`pnpm format:write`) and linted (`pnpm lint`).
4. Commit using Conventional Commits (commitlint enforces this):
   - feat: add xyz
   - fix: correct abc
   - chore: update tooling
5. Open a PR. CI should run `pnpm build`, `pnpm lint`, and tests.

## Notes

- This is a bootstrap: apps and packages contain placeholders that can be replaced with real implementations later.
- The `infra/` folder is not part of the pnpm workspace (no Node package). Keep IaC and scripts here.
