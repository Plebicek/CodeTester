FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jre openjdk-17-jdk maven
RUN apt-get -y update; apt-get -y install curl

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

RUN npm run generate-db

CMD ["node", "index.js"]
