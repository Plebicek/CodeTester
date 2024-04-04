FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jre openjdk-17-jdk maven

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

RUN npm run fetch-db
RUN ["java", "-version"]
RUN ["mvn", "-v"]

ENTRYPOINT ["node", "index.js"]
