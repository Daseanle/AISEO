# Simple dev helpers

COMPOSE=docker compose

.PHONY: up down restart logs ps sh-api sh-web migrate seed build-images

up:
	$(COMPOSE) up -d --build

# Start only backend services (db/cache/object store)
up:db:
	$(COMPOSE) up -d postgres redis minio create-buckets

down:
	$(COMPOSE) down -v

restart: down up

logs:
	$(COMPOSE) logs -f

ps:
	$(COMPOSE) ps

sh-api:
	$(COMPOSE) exec api sh

sh-web:
	$(COMPOSE) exec web sh

migrate:
	$(COMPOSE) exec api pnpm -C apps/api run migrate

seed:
	$(COMPOSE) exec api pnpm -C apps/api run seed

build-images:
	docker buildx build --file infra/docker/Dockerfile.api --target runner --tag aiseo/api:dev .
	docker buildx build --file infra/docker/Dockerfile.web --target runner --tag aiseo/web:dev .
	docker buildx build --file infra/docker/Dockerfile.worker --target runner --tag aiseo/worker:dev .
