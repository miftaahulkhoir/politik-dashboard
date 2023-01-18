#!/bin/bash
source release_ver.sh

make down
cp -f .env.production .env
make run && find . -name . -o -prune -exec rm -rf -- {} +
