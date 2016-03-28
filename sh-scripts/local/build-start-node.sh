#!/usr/bin/env bash

npm i
bower i
grunt build
cd www
mkdir log
npm i
#cd ..
#cp -R dist server
#cd server
node server.js
cd ..
#rm -R dist
