#!/bin/bash

./wait-for-it.sh -t 30 $NET_OPS_CENTER_HOST:$NET_OPS_CENTER_PORT -- npm start
