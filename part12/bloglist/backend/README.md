## NPM commands

* `start` run in production mode (uses `MONGODB_URI`)
* `watch` run in development mode with `nodemon` (uses `MONGODB_URI`)
* `test` run tests
* `lint` run `eslint`
* `start:test` run essentially in production but use `TEST_MONGODB_URI` DB, useful for integration tests

## Environment variables

* `MONGODB_URI` production mongo URI
* `PORT` which port to run on, defaults to 3003
* `TEST_MONGODB_URI` test mongo URI
* `SECRET` random string to be used as JWT secret (see [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for more info)

When running the `dev` Dockerfile image, provide the necessary secrets (for example from some env file or separately)
