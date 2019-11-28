#!/bin/bash

# Used to create ssl certiication

set -e

rm -rf src/cert/*

cd src/cert

openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem