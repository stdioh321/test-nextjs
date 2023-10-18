#!/bin/sh

build=false
docker_compose_file=./infra/docker-compose-dev.yml

while [[ $# -gt 0 ]]; do
  case "$1" in
    -b|--build)
      build=true
      shift
      ;;
    *)
      echo "Invalid option: $1" >&2
      exit 1
      ;;
  esac
done

if [ "$build" = true ]; then
  docker compose -f "$docker_compose_file" build --no-cache
fi

docker compose -f $docker_compose_file up