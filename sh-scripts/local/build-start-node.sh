#!/usr/bin/env bash

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