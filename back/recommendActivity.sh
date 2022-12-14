#!/bin/bash

echo 'start recommending activity';

curl -H "Content-Type: application/json" -X POST -d http://kdt-ai5-team05.elicecoding.com:5000/activity

echo 'success!';
