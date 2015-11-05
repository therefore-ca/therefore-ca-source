#!/usr/bin/env bash

cd www
forever stop server.js
forever start server.js
cd ..