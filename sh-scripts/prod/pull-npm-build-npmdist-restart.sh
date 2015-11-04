#!/usr/bin/env bash

git pull
npm i && bower i --allow-root
grunt build
cd dist
npm i
forever stop server.js
forever start server.js
cd ..