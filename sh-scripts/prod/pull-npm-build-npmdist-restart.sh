#!/usr/bin/env bash

git pull
npm i && bower i --allow-root
grunt build
cd dist
npm i
forever stop gruntstart.js
forever start gruntstart.js
cd ..