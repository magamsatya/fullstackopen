FROM node:16.16.0-alpine3.16 as build-stage

WORKDIR /stage

COPY . .

RUN npm ci --only=prod && npm run build

FROM nginx:1.23.1-alpine

COPY --from=build-stage /stage/build /usr/share/nginx/html

EXPOSE 80
