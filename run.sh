#!/bin/bash
export DOCKER_IMG_TAG=$( git log --grep="Release" --max-count=1 --oneline | awk '{tag=substr($3,1,10) "-fe";print tag}' )

make down
make run
