#!/bin/bash

rm yarn.lock
rm -rf node_modules
yarn cache clean
npx expo install --yarn
npx expo install --check