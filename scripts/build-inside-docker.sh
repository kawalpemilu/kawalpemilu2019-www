#!/bin/bash

set -e
set -x

apt update
apt install -y ruby ruby-dev rsync build-essential

rm -rf /kp/_build/
mkdir -p /kp/_build/

# dokumentasi

gem install bundler

cd /kp/src/dokumentasi
bundle

rm -rf _site
jekyll build

rsync -avH _site/ /kp/_build/dokumentasi/

# public

cd /kp
rsync -avH public/ /kp/_build/

# finalize

cd /kp
chown -R 1000:1000 /kp/_build

