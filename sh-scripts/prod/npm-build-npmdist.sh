#!/usr/bin/env bash

npm i && bower i --allow-root
grunt build
cd dist
npm i
cd ..