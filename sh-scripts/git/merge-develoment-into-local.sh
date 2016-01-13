#!/usr/bin/env bash

git checkout development
git pull
git checkout local
git merge development
