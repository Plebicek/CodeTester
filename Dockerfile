# syntax=docker/dockerfile:1

FROM node:20 as prod
WORKDIR /app
RUN apt-get update && apt-get install -y openjdk-17-jre openjdk-17-jdk maven
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run generate-db
CMD ["node", "index.js"]

FROM node:20 as dev
WORKDIR /app
RUN apt-get update && apt-get install -y openjdk-17-jre openjdk-17-jdk maven
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run generate-db
CMD [ "npm", "run", "dev" ]