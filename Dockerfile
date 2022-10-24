FROM node:16-alpine

COPY ./ /var/www/

RUN mkdir -p /var/www \
  && cd /var/www \
  && npm run build \
  && rm -rf src

WORKDIR /var/www

EXPOSE 3000

CMD node server.js

