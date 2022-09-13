FROM node:14.20.0

WORKDIR /var/www/pensieve
COPY package.json /var/www/pensieve
RUN yarn install
