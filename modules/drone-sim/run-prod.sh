#!/bin/bash

./node_modules/.bin/wait-port -t 30000 $NET_OPS_CENTER_HOST:$NET_OPS_CENTER_PORT
npm start
