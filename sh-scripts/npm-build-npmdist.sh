#!/usr/bin/env bash

npm i && bower i
grunt build
cd dist
npm i && bower i
cd ..