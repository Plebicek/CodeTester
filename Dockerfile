FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jre openjdk-17-jdk maven

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

RUN npm run generate-db

ENTRYPOINT ["node", "index.js"]
