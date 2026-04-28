#! /usr/bin/env bash
# Startup script for Docker container

set -euo pipefail

npm install
npm run $SCRIPT
