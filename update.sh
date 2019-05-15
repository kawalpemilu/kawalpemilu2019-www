#!/bin/bash

pushd src/main2

sudo mkdir -p node_modules
sudo chown -R 1000:1000 node_modules

npm install
npm run build

popd

sudo mkdir -p _public
sudo rm -rf _public/*
sudo chown -R 1000:1000 _public

rsync -avH --progress --delete-excluded src/main2/dist/ _public/

