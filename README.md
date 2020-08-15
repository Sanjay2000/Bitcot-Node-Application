# Bitcot-Node-Application

## How to run the Project?

1. `npm install` to install the dependencies
2. Set up the DB in MySQL. Read the `How to use Knex Migrations?` section.
3. Create a .env file in the root directory of the project and update the required variables. You can use `sample.env` as the skeleton.
4. `npm start` to run the server.

## How to use Knex Migrations?

for create and delete the table we can run some commands:-
```
0. knex migration:make <migration file name>
1. knex migration:latest
2. knex migration:rollback
```
Happy coding ):
