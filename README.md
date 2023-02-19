# Storefront Backend Project

## Database Creation
- first you will need to create a `store database`, also create another database for testing purposes `store_test`.<br>
`CREATE DATABASE store;`<br>
`CREATE DATABASE store_test;`

## .env File
- you will need to add a `.env` file in the root directory and add important variables. The below example is all the variable needed.

```
# DB variables
POSTGRES_HOST= localhost
POSTGRES_DB= store
POSTGRES_DB_TEST= store_test
POSTGRES_USER= postgres
POSTGRES_PASSWORD= # type your postgresql password
ENV=dev
PORT=3000

# Bcrypt variables
PEPPER=your-secret-password
SALT_ROUNDS=10

# JWT variables
TOKEN_SECRET=secret-token
```

## Ports
- the project runs on localhost. the server runs on `Port=3000`, and the database on `Port=5432`

## Project Setup
- run `npm install` to install all the required dependencies.
- run `npm run migration:db` script to create database tables and relationships.

## Start the App
- use `npm run start` to start the server.
- use `npm run build` to build the project.

## Test the App
- use `npm run migration:db:test` to create the tables and relationships for your test database.
- use `npm run test` to perform all test cases.
