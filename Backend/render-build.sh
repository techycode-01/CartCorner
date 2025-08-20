#!/bin/bash

# Install system dependencies
apt-get update -y
apt-get install -y build-essential

# Clear npm cache
npm cache clean --force

# Remove existing sharp installation if any
rm -rf node_modules/sharp

# Install dependencies
npm install

# Rebuild sharp specifically
npm rebuild sharp
