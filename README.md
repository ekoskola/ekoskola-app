# Ekoskola

## Development

```
# Run postgresSQL in docker container.
bash scripts/init_db.sh
yarn db:migrate
yarn db:seed
yarn workspace @ekoskola/server start
```

It should run server.

## Password with nginx

https://www.digitalocean.com/community/tutorials/how-to-set-up-password-authentication-with-nginx-on-ubuntu-14-04

```bash
sudo sh -c "echo -n 'ekoskola:' >> /etc/nginx/.htpasswd"
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/.htpasswd"
```

Add to nginx:

```
    location / {
      ....
      auth_basic "Restricted Content";
      auth_basic_user_file /etc/nginx/.htpasswd;
    }
```

And restart nginx:

```bash
sudo service nginx restart
```

## Setup

- Generate secret for JWT

```bash
head -c 32 /dev/urandom | base64 | tr -d '\n'
```

## Deploy

Run the commands below:

```
nix-shell
morph deploy network.nix switch
```

## Systemd

- Restart a service

```
systemctl restart <name-of-the-service>
```

- Check status of service

```
systemctl status <name-of-the-service>.service
```

- Logs of the service

```
journalctl -f -u <name-of-the-service>
```

## DB

- Login

```
sudo -i -u postgres
psql
```
