run:
	docker compose up -d

build:
	docker build -t synapsisid/patronpolitik:$(DOCKER_IMG_TAG) --no-cache .

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
