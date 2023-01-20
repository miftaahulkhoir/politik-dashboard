#!/bin/bash
source release_ver.sh

if [ -z $1 ] || [ $1 != "master" ]; then
    export DOCKER_IMG_TAG="dev-fe"
    cp -f .env.development .env
    make build && find . -name . -o -prune -exec rm -rf -- {} +
else
    cp -f .env.production .env
    make build && make push && find . -name . -o -prune -exec rm -rf -- {} +
fi
