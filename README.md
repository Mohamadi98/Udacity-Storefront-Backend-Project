# Storefront Backend Project

## Getting Started

- First you will need to add a `.env` file in the root directory and add important variables. The below example is all the variable needed.

```
POSTGRES_HOST= localhost
POSTGRES_DB= add-your-database-name
POSTGRES_DB_TEST= add-your-test-database-name
POSTGRES_USER= postgres
POSTGRES_PASSWORD= add-your-database-password
ENV=dev
PORT=3000
PEPPER=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=secret-token
```

## Database Creation
- This project assumes that you already have Postgresql installed on your local device. Before you start you will to create a database for the project development (please make sure to name the database the same name provided in the .env file). After that you will also need to create another database for the testing.
- My naming suggestions, store & store_test.

## Project Setup
- run `npm install` to install all the required dependencies.
- run `npm run migration:db` script to create database tables.

## Start the App
- use `npm run start` to start the server.
- use `npm run build` to build the project

## Test the App
- use `npm run migration:db:test` to create the tables for your test database.
- use `npm run test` to perform all test cases.
