# Solid TV Monorepo

Monorepo for the Lightning TV frontend and Fastify API backend.

## Structure

```txt
apps/
  tv/   Lightning TV SolidJS app
  api/  Fastify + Prisma API
docs/   Lightning/Solid reference docs
```

## Commands

Run commands from the repository root:

```sh
pnpm install
pnpm dev:tv
pnpm dev:api
pnpm build:tv
pnpm build:api
pnpm tsc:tv
pnpm tsc:api
```

Database commands are proxied to `apps/api`:

```sh
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm db:deploy
```

The frontend package lives in `apps/tv`; the backend package lives in `apps/api`.
