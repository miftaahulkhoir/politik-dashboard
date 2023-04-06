#!/bin/bash
source release_ver.sh

rm -rf .env
if [ -z $1 ] || [ $1 != "master" ]; then
    export DOCKER_IMG_TAG=$( git rev-parse --short HEAD | awk '{tag=$1 "-fe";print tag}' )
    cp -f .env.development .env
    make down-dev
    make run-dev
else
    cp -f .env.production .env
    make down-prod
    make run-prod
fi