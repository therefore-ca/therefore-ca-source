#!/usr/bin/env bash

git checkout development
git pull
git merge local
git push
git checkout local
