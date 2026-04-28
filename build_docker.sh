#! /usr/bin/env bash

set -euo pipefail

SCRIPTDIR=$(dirname $0)

cd $SCRIPTDIR

HASH=$(git log -n 1 --pretty=format:"%H")
TAG=openrailrouting-maps:$HASH

echo "Building image $TAG"

docker build \
    --tag=$TAG \
    $SCRIPTDIR

echo "SUCCESS: Built image $TAG"
