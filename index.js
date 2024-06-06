import http from "http";
import dotenv from "dotenv";
import app from "./src/app.js";
import { createClient } from "redis";
import { initTaskQueue } from "./src/utils/taskQueue.js";
import { initTestQueue } from "./src/utils/testQueue.js";

export let redisClient;

dotenv.config({ path: "./src/.env" });
let redisServer = createClient({url : process.env.REDIS_URL});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

async function appInit() {
  try {
    redisClient = await redisServer.connect();
    await initTaskQueue();
    await initTestQueue();
    if (redisClient) {
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
