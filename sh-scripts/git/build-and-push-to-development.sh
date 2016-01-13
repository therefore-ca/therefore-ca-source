#!/usr/bin/env bash

grunt build
git add --all
git commit -m "- Rebuilding assets"
git checkout development
git pull
git merge local
git push
git checkout local
