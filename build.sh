#!/bin/bash
source release_ver.sh

echo $DOCKER_IMG_TAG
cp -f .env.production .env
#sed -i "/APP_VERSION/c \APP_VERSION=$RELEASE_VER" .env
make build && make push && find . -name . -o -prune -exec rm -rf -- {} +
