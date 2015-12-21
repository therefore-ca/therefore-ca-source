#!/usr/bin/env bash

git pull
#npm i && bower i --allow-root
#grunt build
cd www
#npm i
#cd ..
#rsync -rtvuc --stats dist/ www/
#cd www
forever stop server.js
forever start server.js
cd ..
#rm -R dist