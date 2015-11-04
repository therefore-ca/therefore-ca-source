#!/usr/bin/env bash

git pull
npm i && bower i --allow-root
grunt build
cd dist
npm i
forever stop index.js
forever start index.js
cd ..