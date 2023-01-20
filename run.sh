#!/bin/bash
source release_ver.sh

if [ -z $1 ] || [ $1 != "master" ]; then

else
    make down-prod
    cp -f .env.production .env
    make run-prod && find . -name . -o -prune -exec rm -rf -- {} +
fi