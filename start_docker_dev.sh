#!/bin/sh

docker_compose_file="./infra/docker-compose-dev.yml"
docker_build_flag="-b"

if [[ "$*" == *"$docker_build_flag"* ]]; then
    docker-compose -f "$docker_compose_file" build --no-cache
fi

docker-compose -f "$docker_compose_file" up
