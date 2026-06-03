# CLAUDE.md

This repository is a pnpm Monorepo.

```txt
apps/
  tv/   Lightning TV SolidJS frontend
  api/  Fastify + Prisma backend
docs/   Lightning/Solid reference docs
```

Use root workspace commands:

```sh
pnpm dev:tv
pnpm dev:api
pnpm build:tv
pnpm build:api
pnpm tsc:tv
pnpm tsc:api
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

Frontend code lives in `apps/tv`. It is a Lightning renderer app, so use renderer nodes such as `<View>`, `<Text>`, `<Row>`, and `<Column>` instead of DOM elements or CSS.

Backend code lives in `apps/api`. Prisma schema and migrations live in `apps/api/prisma`.
