# syntax=docker/dockerfile:1

FROM node:20
WORKDIR /app
RUN apt-get update && apt-get install -y openjdk-17-jre openjdk-17-jdk maven
RUN npm install
COPY . .
RUN npm run generate-db
CMD ["node", "index.js"]
