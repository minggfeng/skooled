# SkooledDS

> A management tool for educators, easing communication and accessibility to school related activites for parents and students.

## Team

  - Lavanya Ammi Chandrashekara
  - Ming Feng
  - Salih Abuelyaman
  - Steven Kim

## Table of Contents

1. [Usage](#usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Database](#database)
    1. [Install](#install)
    1. [NPM Run](#npm-run)
1. [Contributing](#contributing)

## Usage

This project assumes you have installed the requirements noted below. Once you've installed and run the NPM scripts, you'll be able to login to test the service locally at localhost:5000. You will need to seed the database with a teacher prior to login (see server/index.js).

There are five distinct folders for review.
- psql-database (Postgres database)
- react-client (React front-end)
- server (Express server)
- services (authentication, email, etc.)
- test (client, database, server, etc.)

## Requirements

- axios 0.16.x
- bcryptjs 2.4.x
- bluebird 3.5.x
- body-parser 1.17.x
- bookshelf 0.10.x
- express 4.15.x
- jsonwebtoken 7.4.x
- knex 0.13.x
- mailgun-js 0.10.x
- material-ui 0.18.x
- node 7.9.x
- nodemon 1.11.x
- passport-jwt 2.2.x
- pg 6.1.x
- react 15.4.x
- react-dom 15.4.x
- react-router 4.1.x
- react-router-dom 4.1.x
- react-tap-event-plugin 2.0.x
- stripe 4.19.x
- twillio 3.0.x

## Development

### Database

Requires a 'test' database with a 'root' user to access the Postgres database. Please see the file 'psql-database/config/index.js' for more details.

### Install

From within the root directory:

```sh
npm install
```

### NPM Run

From within the root directory:

```sh
npm run react-dev
```

To run the server open a terminal window:

```sh
npm run server-dev
```

To run tests open a terminal window:

```sh
npm test
```


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
