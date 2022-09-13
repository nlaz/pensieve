FROM node:14.20.0-slim

WORKDIR /var/www/pensieve
COPY package.json /var/www/pensieve
RUN yarn install
