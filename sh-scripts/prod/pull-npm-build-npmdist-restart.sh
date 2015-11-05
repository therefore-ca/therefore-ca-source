#!/usr/bin/env bash

git pull
npm i && bower i --allow-root
grunt build
cd dist
npm i
cd ..
cp -R dist www
cd www
forever stop server.js
forever start server.js
cd ..
rm -R dist