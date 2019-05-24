#!/bin/bash

set -e
set -x

apt update
apt install -y rsync

rm -rf /kp/_public/

pushd /kp/
rm -rf node_modules dist

npm install
npm run build

popd

# copy for public

mkdir -p /kp/_public/
rsync -avH --delete-excluded /kp/dist/ /kp/_public/

