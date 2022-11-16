#!/bin/bash

if [ $# -eq 0 ]; then
  env > /.env
  # env > /usr/src/client/.env
  env > /usr/src/server/.env
  /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
else
  exec "$@"
fi
