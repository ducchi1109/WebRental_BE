#!/bin/bash

if [ -d "${PWD}/../migration" ]
then
    docker run \
    --env FLYWAY_URL=$FLYWAY_URL \
    --env FLYWAY_USER=$FLYWAY_USER \
    --env FLYWAY_PASSWORD=$FLYWAY_PASSWORD \
    --env FLYWAY_DRIVER=$FLYWAY_DRIVER \
    --env FLYWAY_SCHEMAS=$FLYWAY_SCHEMAS \
    --env FLYWAY_CONFIG_FILES=$FLYWAY_CONFIG_FILES \
    --rm -v $PWD/../migration/:/flyway/sql -v $PWD/../config:/flyway/conf --net="host" flyway/flyway migrate
else
    echo "Error: no migration directory detected"
fi
exit;
