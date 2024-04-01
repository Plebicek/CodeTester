FROM node:18 AS base

WORKDIR /app

RUN apt-get update && apt-get install -y openjdk-17-jdk
RUN apt-get update && apt-get install -y maven


ENV JAVA_HOME /usr/lib/jvm/java-11-openjdk-amd64
ENV MAVEN_HOME /usr/share/maven

RUN javac -version

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

RUN npm run fetch-db

ENTRYPOINT ["node", "index.js"]
