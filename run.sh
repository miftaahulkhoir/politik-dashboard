#!/bin/bash
source release_ver.sh

if [ -z $1 ] || [ $1 != "master" ]; then
    cp -f .env.development .env
    make down-dev
    make run-dev && find . -name . -o -prune -exec rm -rf -- {} +
else
    cp -f .env.production .env
    make down-prod
    make run-prod && find . -name . -o -prune -exec rm -rf -- {} +
fi