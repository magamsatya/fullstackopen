FROM node:16.16.0-alpine3.16

WORKDIR /work

COPY --chown=node . .

RUN npm ci --only=prod

USER node

CMD ["npm", "start"]
