#!/usr/bin/env bash

cd server
forever stop server.js
forever start server.js
cd ..