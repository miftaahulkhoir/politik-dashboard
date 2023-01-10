#!/bin/bash
export RELEASE_VER=$( git log --grep="Release" --max-count=1 --oneline | awk '{print substr($3,1,10)}' )
sed -i "/APP_VERSION/c \APP_VERSION=$RELEASE_VER" .env
if [ -z $1 ] || [ $1 != "master" ]; then
    export DOCKER_IMG_TAG="dev-fe"
    make cleanimg
    make build
else
    export DOCKER_IMG_TAG=$( git log --grep="Release" --max-count=1 --oneline | awk '{tag=substr($3,1,10) "-fe";print tag}' )
    make build
    make push
fi
