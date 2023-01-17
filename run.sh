#!/bin/bash
export DOCKER_IMG_TAG=$( git log --max-count=1 --oneline | awk '{tag=$1 "-fe";print tag}' )

make down
cp -f .env.production .env
make run && find . -name . -o -prune -exec rm -rf -- {} +
