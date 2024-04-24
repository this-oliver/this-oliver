#!/usr/bin/env bash
CURR_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
PACKAGES_DIR=$CURR_DIR/../packages
DOCKER_BASE=thisoliver

docker build -t oliverrr:backend $PACKAGES_DIR/backend
docker tag oliverrr:backend $DOCKER_BASE/oliverrr:backend
docker push $DOCKER_BASE/oliverrr:backend

docker build -t oliverrr:frontend $PACKAGES_DIR/frontend
docker tag oliverrr:frontend $DOCKER_BASE/oliverrr:frontend
docker push $DOCKER_BASE/oliverrr:frontend