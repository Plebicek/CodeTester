import http from "http";
import app from "./src/app.js";
import dotenv from "dotenv";
import { createClient } from "redis";

export let redisClient;

dotenv.config({ path: "./src/.env" });

let redisServer = createClient();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

async function appInit() {
  try {
    server.listen(PORT, function () {
      console.log(`SERVER RUNNING... http://localhost:${PORT}/`);
    });
    redisClient = await redisServer.connect();
    if (redisClient) {
      console.log("redis connected");
    }
  } catch (err) {
    throw new Error("Init app error occured " + err);
  }
}

appInit();
