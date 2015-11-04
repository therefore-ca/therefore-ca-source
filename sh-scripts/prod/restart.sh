#!/usr/bin/env bash

cd dist
forever stop server.js
forever start server.js
cd ..