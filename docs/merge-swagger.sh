#!/usr/bin/env bash

mkdir -p swagger-out; rm -rf swagger-out/spec.yaml; ../node_modules/.bin/swagger-merger -i spec/index.yaml -o swagger-out/spec.yaml
