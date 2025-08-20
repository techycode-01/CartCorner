#!/usr/bin/env bash
# exit on error
set -o errexit

npm install --platform=linux --arch=x64 sharp
npm install
