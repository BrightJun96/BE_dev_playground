#!/bin/bash

docker buildx build --platform linux/amd64,linux/arm64 -t jjalseu/devlounge:latest --push -f ./Dockerfile --target production .
