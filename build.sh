#!/bin/bash
export RELEASE_VER=$( git log --grep="Release" --max-count=1 --oneline | awk '{print substr($3,1,10)}' )
if [ -z $1 ] || [ $1 != "master" ]; then
    export DOCKER_IMG_TAG="dev-fe"
    cp -f .env.development .env
    sed -i "/APP_VERSION/c \APP_VERSION=$RELEASE_VER" .env
    make cleanimg
    make build
    rm -rf .env
else
    export DOCKER_IMG_TAG=$( git log --grep="Release" --max-count=1 --oneline | awk '{tag=substr($3,1,10) "-fe";print tag}' )
    cp -f .env.production .env
    sed -i "/APP_VERSION/c \APP_VERSION=$RELEASE_VER" .env
    make build
    make push
    rm -rf .env
fi
