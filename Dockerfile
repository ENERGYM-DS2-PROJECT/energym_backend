FROM node:16.17.0-alpine

WORKDIR /opt/app/backend
COPY . .
RUN npm install pm2 -g
RUN npm ci

CMD ["pm2-runtime", "server.js"]