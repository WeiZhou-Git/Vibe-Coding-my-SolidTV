# AGENTS.md

Guidance for Codex when working in this repository.

## Repository Shape

This is a pnpm Monorepo:

```txt
apps/
  tv/   Lightning TV app built with SolidJS and @lightningtv/solid
  api/  Fastify API with Prisma
docs/   Lightning/Solid reference documentation
```

Run workspace commands from the repository root.

## Commands

```sh
pnpm install

pnpm dev:tv          # Start Vite frontend
pnpm dev:api         # Start Fastify API

pnpm build:tv        # Build frontend
pnpm build:api       # Build backend
pnpm build           # Build all packages with build scripts

pnpm tsc:tv          # Typecheck frontend
pnpm tsc:api         # Typecheck backend
pnpm tsc             # Typecheck all packages with tsc scripts

pnpm lint            # Lint frontend
pnpm lint-fix        # Auto-fix frontend lint issues
pnpm test            # Run frontend Vitest suite
pnpm storybook       # Start frontend Storybook

pnpm db:generate     # Prisma generate
pnpm db:migrate      # Prisma migrate dev
pnpm db:seed         # Prisma seed
pnpm db:deploy       # Prisma migrate deploy
```

Device builds:

```sh
TARGET_DEVICE=lg pnpm build:tv
TARGET_DEVICE=tizen pnpm build:tv
```

## Frontend: `apps/tv`

Lightning TV app built with SolidJS. This is a WebGL/canvas renderer app, not a DOM web app.

Important rules:

- Use `<View>`, `<Text>`, `<Row>`, `<Column>` and Lightning primitives, not DOM tags.
- Do not use CSS classes or browser CSS layout assumptions.
- Colors should be renderer-compatible hex strings with alpha, for example `"#ff0000ff"`.
- Use `color` for background fills.
- Focus is remote-control driven; use the app's `useFocusManager` pattern and explicit focus paths.
- Keep Vite aliases local to `apps/tv`:
  - `@/*` -> `apps/tv/src/*`
  - `#devices/*` -> `apps/tv/devices/*`

Main frontend paths:

```txt
apps/tv/src/
apps/tv/devices/
apps/tv/public/
apps/tv/environments/
apps/tv/.storybook/
```

Routes are defined in `apps/tv/src/index.tsx` using `HashRouter`.

## Backend: `apps/api`

Fastify API with Prisma.

Main backend paths:

```txt
apps/api/src/
apps/api/prisma/
apps/api/Dockerfile
apps/api/docker-compose.yml
```

Run `pnpm db:generate` after changing Prisma schema. The API package also runs `prisma generate` on install.
