#!/bin/bash

docker run -ti -v $(pwd):/kp node /kp/scripts/build-inside-docker.sh

