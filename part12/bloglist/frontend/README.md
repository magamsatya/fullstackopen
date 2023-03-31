## NPM commands

* `start` run in development mode with webpack serve, runs on port 3004
* `build` create production build in `build/` folder
* `lint` run `eslint`
* `cypress:run` run integration tests with cypress, needs both a running frontend and backend
* `test` run tests

## Development environment variables

* `PROXY_URL` Proxy URL for webpack. If running containerized, use custom url to proxy backend calls to (Docker) host instead of localhost. Example: `http://host.docker.internal:3003`
* `BACKEND_URL` used by Cypress tests. If not defined then `http://localhost:3003` used
* `FRONTEND_URL` used by Cypress tests. If not defined then `http://localhost:3004` used
