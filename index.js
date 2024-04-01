import http from "http";
import app from "./src/app.js";
import dotenv from "dotenv";
import { createClient } from "redis";
import { initTaskQueue } from "./src/utils/taskQueue.js";
import { initTestQueue } from "./src/utils/testQueue.js";

export let redisClient;

dotenv.config({ path: "./src/.env" });

let redisServer = createClient({url : "redis://redis:6379"});
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

async function appInit() {
  try {
    redisClient = await redisServer.connect();
    await initTaskQueue();
    await initTestQueue();
    console.log("queue init");
    if (redisClient) {
      console.log("redis connected");
      redisClient.on("error", (error) => {
        console.log("Redis client error: ", error);
      });
    }
    server.listen(PORT, function () {
      console.log(`SERVER RUNNING... http://localhost:${PORT}/`);
    });
  } catch (err) {
    throw new Error("Init app error occured " + err);
  }
}

appInit();
