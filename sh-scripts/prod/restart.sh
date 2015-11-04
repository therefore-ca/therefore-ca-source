#!/usr/bin/env bash

cd dist
forever stop gruntstart.js
forever start gruntstart.js
cd ..