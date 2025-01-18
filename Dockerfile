FROM node:23 AS build
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm install 
RUN npm run build

FROM node:23 As production 
WORKDIR /app
COPY package*.json /app/
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
RUN npm run generate-db
CMD [ "node", "dist/src/index.js"]