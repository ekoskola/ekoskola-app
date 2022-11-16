FROM debian:stretch-slim

SHELL ["/bin/bash", "-o", "pipefail", "-c"]
ENV DEBIAN_FRONTEND noninteractive

# hadolint ignore=DL3008,DL3016
RUN apt-get update && \
  apt-get install -y --no-install-recommends apt-transport-https ca-certificates curl gnupg \
    lsb-release openssh-client pdftk dialog openssh-server nginx supervisor build-essential cron rsyslog libx11-xcb1 \
    libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 xvfb libxtst6 libatk-bridge2.0-0 libgtk-3-0 git && \
  mkdir -p /var/run/sshd && \
  curl -sL https://deb.nodesource.com/setup_12.x | bash /dev/stdin && \
  apt-get install -y --no-install-recommends nodejs && \
  npm install --quiet node-gyp yarn -g && \
  npm install --quiet && \
  npm config set python /usr/bin/python2.7 && \
  rm -rf /var/lib/apt/lists/*

# set root password for ssh
ENV SSH_PASSWD "root:Docker!"
RUN echo "$SSH_PASSWD" | chpasswd

# copy config files
COPY docker/sshd_config /etc/ssh/
COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY docker/nginx/nginx.vh.default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx/.htpasswd /etc/nginx/conf.d/.htpasswd
COPY docker/supervisord.conf /etc/supervisor/supervisord.conf
COPY docker/entrypoint.sh /
COPY docker/crontab /etc/crontab
RUN chmod 600 /etc/crontab && rm -f /etc/cron.daily/* && mkdir -p /var/log/supervisor
COPY docker/cron.daily /etc/cron.daily

# copy repository
COPY . /usr/src/

# build frontend
WORKDIR /usr/src/client
RUN npm install && npm run build && rm -rf /usr/src/client/node_modules

# install server deps
WORKDIR /usr/src/server
RUN npm install && npm run build

EXPOSE 8000 8080 2222
ENTRYPOINT [ "/entrypoint.sh" ]
#CMD ["/usr/bin/supervisord"]
