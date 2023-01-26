down-prod:
	docker compose -f docker-compose.prod.yml down

run-prod:
	docker compose -f docker-compose.prod.yml pull
	docker compose -f docker-compose.prod.yml up -d

down-dev:
	docker compose -f docker-compose.dev.yml down

run-dev:
	docker compose -f docker-compose.dev.yml up -d

build:
	docker image prune -a -f --filter "until=24h"
	docker build --no-cache -t synapsisid/patronpolitik:$(DOCKER_IMG_TAG) .

dev:
	next dev

push:
	docker push synapsisid/patronpolitik:$(DOCKER_IMG_TAG)
