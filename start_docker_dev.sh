#!/bin/bash

docker_compose_file="./infra/docker-compose-dev.yml"
compose_command="docker-compose"
build=false

if ! command -v "$compose_command" &> /dev/null; then
  if command -v "docker compose" &> /dev/null; then
    compose_command="docker compose"
  else
    echo "Error: Neither 'docker-compose' nor 'docker compose' command found."
    exit 1
  fi
fi

while [[ $# -gt 0 ]]; do
  case "$1" in
    -f|--file)
      docker_compose_file="$2"
      shift 2
      ;;
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
  "$compose_command" -f "$docker_compose_file" build --no-cache
fi

"$compose_command" -f "$docker_compose_file" up
