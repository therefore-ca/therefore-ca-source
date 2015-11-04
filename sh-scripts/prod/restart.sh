#!/usr/bin/env bash

cd dist
forever stop index.js
forever start index.js
cd ..