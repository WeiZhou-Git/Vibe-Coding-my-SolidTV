FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json ./
COPY prisma ./prisma
RUN pnpm db:generate

COPY src ./src
RUN pnpm build

EXPOSE 3001

CMD ["sh", "-c", "pnpm db:deploy && node dist/server.js"]
