#!/bin/bash

# drop all existin entries. The net-ops-center coming online assumes the existence
# of no drones.
./node_modules/.bin/wait-port -t 30000 $DB_HOST:27017 
npm run drop-start
