#!/bin/bash
if [ -z $1 ] || [ $1 != "master" ]; then
    export DOCKER_IMG_TAG="dev-fe"
else
    export DOCKER_IMG_TAG=$( git log --grep="Release" --max-count=1 --oneline | awk '{tag=substr($3,1,10) "-fe";print tag}' )
fi

make down
make run
