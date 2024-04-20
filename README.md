# Temtem One-Backend Technical test 

## Project Setup

For a quick setup, the application can be built and run with **Docker** and `docker-compose` you can start by cloning this repository.

    git clone https://github.com/samyouaret/tmo-iv

Or with SSH

    git clone git@github.com:samyouaret/tmo-iv

Create an .env file from of env.example, and make sure to setup env variables needed by the application.

    cp .env.example .env

API docs provide a good start to get up and running with the endpoints of the application [Swagger docs](http://localhost:3000/docs). The API is documented using [openApi]([https://](https://swagger.io/specification/)).

### Using docker-compose

Using Docker compose 

    docker compose up --build

### Working with node and yarn

To use the app with node and yarn without Docker, first install dependencies.

    yarn install

Setup the variables needed in `.env`

Run database migrations

    yarn run migration:run

Start the application

    yarn run start