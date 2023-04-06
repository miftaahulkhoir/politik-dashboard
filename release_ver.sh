#!/bin/bash
export RELEASE_VER=0.0.1
export DOCKER_IMG_NAME=patronsmonitoring
export DOCKER_IMG_TAG=$( echo $RELEASE_VER | awk '{tag=$1 "-fe";print tag}' )
