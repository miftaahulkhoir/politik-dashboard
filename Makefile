run:
	docker compose pull
	docker compose up -d

build:
	docker build --no-cache -t synapsisid/patronpolitik:$(DOCKER_IMG_TAG) .

cleanimg:
	docker compose down
	docker rmi synapsisid/patronpolitik:$(DOCKER_IMG_TAG)
	docker image prune -a -f

down:
	docker compose down

dev:
	next dev

push:
	docker push synapsisid/patronpolitik:$(DOCKER_IMG_TAG)
