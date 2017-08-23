FROM node:8.1.4

WORKDIR /var/www/pensieve
COPY package.json /var/www/pensieve
RUN yarn install
