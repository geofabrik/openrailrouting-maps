#! /usr/bin/env bash
# Start Docker container and run NPM inside it

set -euo pipefail

SCRIPT=serve
if [ "$#" -gt 2 ]; then
    echo "ERROR: Expected 0 or 1 arguments only."
    echo "Usage: $0 [SCRIPT]"
    exit 1
elif [ "$#" = 1 ]; then
    SCRIPT=$1
fi

HASH=$(git log -n 1 --pretty=format:"%H")
TAG=openrailrouting-maps:$HASH
SCRIPTDIR=$(dirname $0)

echo "Starting container $TAG"
docker run \
    --attach=STDIN --attach=STDOUT --attach=STDERR \
    --interactive=true --tty=true \
    --user=$(id -u ${USER}):$(id -g ${USER}) \
    --expose=3000 \
    --network=host \
    --mount=type=bind,source="$SCRIPTDIR",destination=/repo \
    --env=SCRIPT=$SCRIPT \
    $TAG || true

CONTAINER_ID=$(docker container ls -a -q -f ancestor=$TAG)

echo "Removing all openrailrouting-maps containers: $CONTAINER_ID"
docker container rm $CONTAINER_ID
