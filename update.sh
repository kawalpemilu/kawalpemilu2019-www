#!/bin/bash

pushd src/main
~/.gem/ruby/2.5.0/bin/bundle exec jekyll build
popd

mkdir -p _public _build

rm -rf _public/*
rm -rf _build/*

rsync -avH --progress src/main/_site/ _build/
rsync -avH --progress src/tabulasi/ _build/
rsync -avH --progress --exclude '*tabulasi*' --delete-excluded _build/ _public/

