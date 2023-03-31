FROM node:16.16.0-alpine3.16 as build-stage

WORKDIR /stage

COPY . .

ENV REACT_APP_BACKEND_URL=/api \
    CI=true

RUN npm ci --only=prod && npm test && npm run build

FROM nginx:1.23.1-alpine

COPY --from=build-stage /stage/build /usr/share/nginx/html

EXPOSE 80
