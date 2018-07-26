#!/bin/bash

# drop all existin entries. The net-ops-center coming online assumes the existence
# of no drones.
./wait-for-it.sh -t 30 $DB_HOST:27017 -- npm run drop-start
