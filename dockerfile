FROM node:16.17.0

WORKDIR .

COPY package.json .
RUN npm install

COPY . . 