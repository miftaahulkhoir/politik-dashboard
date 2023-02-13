#!/bin/bash
export RELEASE_VER=0.0.5
export DOCKER_IMG_TAG=$( echo $RELEASE_VER | awk '{tag=$1 "-fe";print tag}' )
