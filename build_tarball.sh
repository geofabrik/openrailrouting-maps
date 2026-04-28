#! /bin/bash

# Build a tarball from the contents of the dist/ subdirectory.
# This script needs to be run after building with NPM (optionally inside Docker).

set -euo pipefail

if [ $# -gt 0 ]; then
    echo "Too much arguments."
    echo "Usage: $0"
fi

SCRIPT_DIR=$(dirname "$0")
PWD=$(pwd)
if [[ $PWD != $SCRIPT_DIR && $SCRIPT_DIR != '.' ]]; then
    echo "ERROR: Script must be run from ${SCRIPT_DIR}"
    exit 1
fi

if [[ -f "config-local.js" ]]; then
    echo "ERROR: config-local.js exists. This file should be absent for reproduceable release builts!"
    exit 1
fi

GIT_TAG=`git describe`
OUTPUT_FILENAME="openrailrouting-maps_${GIT_TAG}.tar.gz"
echo "Building Docker image"
bash build_docker.sh
echo "Removing contents of dist/"
rm -rf dist/*
echo "Building web frontend within a Docker container and writing the results to dist/."
bash start_container.sh build
echo "Packaging dist/ into $OUTPUT_FILENAME"
tar -cvzf "$OUTPUT_FILENAME" dist/
