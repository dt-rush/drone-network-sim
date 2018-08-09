#!/bin/bash

./node_modules/.bin/wait-port -t 30000 $DB_HOST:27017
npm run prod
