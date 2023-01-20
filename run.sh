#!/bin/bash
source release_ver.sh

rm -rf .env
if [ -z $1 ] || [ $1 != "master" ]; then
    make down-dev
    cp -f .env.development .env
    make run-dev && find . -name . -o -prune -exec rm -rf -- {} +
else
    make down-prod
    cp -f .env.production .env
    make run-prod && find . -name . -o -prune -exec rm -rf -- {} +
fi