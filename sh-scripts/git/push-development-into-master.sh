#!/usr/bin/env bash

git checkout master
git merge development
git push
git checkout local
