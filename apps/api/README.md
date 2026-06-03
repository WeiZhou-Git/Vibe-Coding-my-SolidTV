# API

Minimal Fastify API for the TV app.

## Local Setup

```sh
pnpm install
docker compose up -d
pnpm db:migrate
pnpm db:seed
pnpm dev
```

The API runs on `http://localhost:3001` by default.

## Endpoints

```txt
GET /health
GET /api/world-items
GET /api/atmosphere-items
```

## Database

Local PostgreSQL is managed by `docker-compose.yml`.

The first table is `content_items`, which stores `world`, `atmosphere`, and later `wallpaper` content.

## Linux Deployment

Create the production environment file:

```sh
cp .env.production.example .env.production
vi .env.production
chmod 600 .env.production
```

Use a strong database password. If the password contains reserved URL characters, URL-encode it in `DATABASE_URL`.

Start the API and PostgreSQL:

```sh
docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build
docker compose --env-file .env.production -f docker-compose.prod.yml exec api pnpm db:seed
curl http://127.0.0.1:3001/health
```

Run `db:seed` only for the first deployment.
