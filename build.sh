#!/bin/bash

docker run -ti -v $(pwd):/kp ubuntu /kp/scripts/build-inside-docker.sh

