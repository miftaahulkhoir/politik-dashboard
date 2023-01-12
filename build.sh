#!/bin/bash
export RELEASE_VER=$( git log --max-count=1 --oneline | awk '{print $1}' )
export DOCKER_IMG_TAG=$( git log --max-count=1 --oneline | awk '{tag=$1 "-fe";print tag}' )
echo $DOCKER_IMG_TAG
cp -f .env.production .env
#sed -i "/APP_VERSION/c \APP_VERSION=$RELEASE_VER" .env
make build && make push && rm -rf *
