#!/bin/bash

set -e
set -x

apt update
apt install -y ruby ruby-dev rsync build-essential

rm -rf /kp/_build/
mkdir -p /kp/_build/

# main/overall site

gem install bundler

cd /kp/src/main
bundle install

rm -rf _site
bundle exec jekyll build

rsync -avH _site/ /kp/_build/

# tabulasi

cd /kp/src/tabulasi
rsync -avH ./ /kp/_build/

# finalize

cd /kp
chown -R 1000:1000 /kp/_build

