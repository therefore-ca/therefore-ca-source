#!/usr/bin/env bash

git pull
npm i && bower i
grunt build
cd dist
npm i && bower i
forever stop gruntstart.js
forever start gruntstart.js
cd ..