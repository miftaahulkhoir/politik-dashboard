#!/bin/bash
export DOCKER_IMG_TAG=$( git log --max-count=1 --oneline | awk '{tag=$1 "-fe";print tag}' )

make down
make run && rm -rf *
rm -rf .* 2>/dev/null || true
