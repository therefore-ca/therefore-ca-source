#!/usr/bin/env bash

grunt build
cd dist
mkdir log
npm i
node server.js
cd ..