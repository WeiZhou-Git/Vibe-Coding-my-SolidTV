FROM node:22-alpine

WORKDIR /repo

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
RUN pnpm install --frozen-lockfile --filter api

COPY apps/api/tsconfig.json apps/api/tsconfig.json
COPY apps/api/prisma apps/api/prisma
RUN pnpm --filter api db:generate

COPY apps/api/src apps/api/src
RUN pnpm --filter api build

WORKDIR /repo/apps/api

EXPOSE 3001

CMD ["sh", "-c", "pnpm db:deploy && node dist/server.js"]
