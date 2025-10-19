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
│   ├── api          # NestJS service (now runnable, exposes /seo/suggest)
│   └── web          # Next.js app (now runnable, simple AISEO MVP UI)
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
pnpm dev       # turbo run dev --parallel (starts web at 3000, api at 3001)
pnpm build     # turbo run build
pnpm lint      # turbo run lint
pnpm test      # turbo run test
pnpm format    # prettier --check . (no-op formatting check)
```

Each workspace (apps/*, packages/*) exposes the same script names so Turborepo can orchestrate them consistently.

## Preview

- Web UI: http://localhost:3000
- API: http://localhost:3001/seo/suggest?topic=AI%20SEO

The web app provides a simple form to generate SEO title/description/H1/outline suggestions, powered by the API. CORS is enabled by default on the API.

## TypeScript configuration

A shared base config lives in tsconfig.base.json and is extended by individual workspaces. Path alias `@shared/*` points to `packages/shared/src/*`.

## Linting & formatting

- ESLint configuration is defined at the root and applies to all workspaces, with scoped overrides for Next.js (apps/web) and NestJS (apps/api).
- Prettier is configured at the root. Run `pnpm format` to check formatting or `pnpm format:write` to apply formatting.

## Environment variables

- Each application should define its own `.env` file at the workspace root (e.g., `apps/web/.env`, `apps/api/.env`).
- Commit sanitized `.env.example` files to document required variables for each app.

Examples:

```
# apps/web/.env.example
NEXT_PUBLIC_API_URL=http://localhost:3001

# apps/api/.env.example
PORT=3001
OPENAI_API_KEY=
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

- This is an MVP: apps now run for preview. You can upgrade the API to use real LLMs (OpenAI) and add keyword research, audits, and content workflows in follow-up iterations.
- The `infra/` folder is not part of the pnpm workspace (no Node package). Keep IaC and scripts here.
