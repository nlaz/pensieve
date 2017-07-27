FROM node:8.1.4

WORKDIR /var/www/boreas
COPY package.json /var/www/boreas
RUN yarn install
