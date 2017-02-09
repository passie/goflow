#!/bin/sh

set -e

docker run \
    --detach \
    --interactive \
    --name goflow \
    --publish 8080:8080 \
    --tty \
    application-goflow
