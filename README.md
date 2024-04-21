# Temtem One-Backend Technical test 

## Project Setup

For a quick setup, the application can be built and run with **Docker** and `docker-compose` you can start by cloning this repository.

    git clone https://github.com/samyouaret/tmo-iv

Or with SSH

    git clone git@github.com:samyouaret/tmo-iv

Create an `.env` file from of `env.example`, and make sure to setup env variables needed by the application.

    cp .env.example .env

API docs provide a good start to get up and running with the endpoints of the application [Swagger docs](http://localhost:3000/docs). The API is documented using [openApi]([https://](https://swagger.io/specification/)).

### Using docker-compose

Using Docker compose 

    docker compose up --build

### Working with node and yarn

To use the app with node and yarn without Docker, first install dependencies.

    yarn install

Setup the variables needed in `.env`, and make sure to create a Database in Postgres

Run database migrations

    yarn run migration:run

Start the application

    yarn run start

##  Project Init

With Docker setup, A new user with role `OWNER` will be created at the startup of the application.

```txt
email=admin@tmo-mailer.com
password=admin
```

Without using Docker, it will be created after running `yarn run migration:run` command above.