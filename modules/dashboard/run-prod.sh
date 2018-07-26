#!/bin/bash

./wait-for-it.sh -t 30 $DB_HOST:27017 -- npm run prod
