# Ekoskola

## Start

The express server is in charge of serving the react app so:

The react app should be build

```bash
cd client/
npm run build
```

```bash
cd server/
npm run build
npm run serve
```

For production run it with pm2

```bash
pm2-runtime start ecosystem.config.js
```

And you can access the site with:

http://localhost:8000

## Migrations

You can use following commands
```
npm run db:pending # list pending migrations
npm run db:migrate # migrate pending migrations
npm run db:rollback # rollback last migration
```

## How to use graphql

* cURL

```
curl \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"query":"{games (grade:[\"kinder_garden\"]) {id, name, file_id, description, outdoor, grade}}"}' \
  http://localhost:8000/graphql
```

* With pagination

```
{
  games(limit: 1, offset: 0, location: ["outdoor"])  {id, name, file_id, description, location, grade, topics, classes}
}
```


```
mutation {
  addGame(name: "juego 234234", description: "some useful txt", outdoor: true) {
    id
    description
    outdoor
  }
}
```

## Docker

Run it with:

```
docker-compose up --build
```

If permisions are needed to have `data` directory with postgres persistent data

```
sudo chmod -R 777 ./data/
```

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
