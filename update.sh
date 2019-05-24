#!/bin/bash

sudo mkdir -p node_modules
sudo chown -R 1000:1000 node_modules

sudo rm -rf dist
npm install
npm run build

sudo mkdir -p _public
sudo rm -rf _public/*
sudo chown -R 1000:1000 _public

rsync -avH --progress --delete-excluded dist/ _public/

