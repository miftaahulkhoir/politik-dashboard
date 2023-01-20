#!/bin/bash
source release_ver.sh

rm -rf .env
if [ -z $1 ] || [ $1 != "master" ]; then
    export DOCKER_IMG_TAG="dev-fe"
    cp -f .env.development .env
    make down-dev
    make run-dev && find . -name . -o -prune -exec rm -rf -- {} +
else
    cp -f .env.production .env
    make down-prod
    make run-prod && find . -name . -o -prune -exec rm -rf -- {} +
fi