# KOA REST API WLB TEST

Backend Tes WLB

## Installation

setelah melakukan clone pada repository ini, lakukan instalasi node package manager terlebih dahulu,

```bash
npm install
```
kemudian konfigurasi database pada file config.js di folder config

```javascript
{
  "development": {
    "username": "postgres",
    "password": "okerapopo",
    "database": "koa_restapi",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "okerapopo",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "okerapopo",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}

```

setelah selesai melakukan konfigurasI, jalankan perintah migrate untuk membuat tabel

```bash
npx sequelize-cli db:migrate
```

apabila pada komputer/laptop belum memiliki sequelize cli, maka install terlebih dahulu dengan perintah:

```bash
npm install --save-dev sequelize-cli
```

## Usage

```javascript
npm run start
```
## Dokumentasi API menggunakan Postman

[DOCUMENTASI API](https://documenter.getpostman.com/view/6225373/TVev3jRa)


## Github
[GIT](https://github.com/wildanicard) wildanicardi
