import http from "http";
import dotenv from "dotenv";
import app from "./src/app.js";
import { createClient } from "redis";
import taskQueueInit from "./src/helper/queue.js";
import testQueueInit from "./src/helper/test_queue.js";
dotenv.config({ path: "./src/.env" });

let redisClient
let redisServer = createClient({url : process.env.REDIS_URL});

export const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

async function appInit() {
  try {
    redisClient = await redisServer.connect();
    taskQueueInit()
    testQueueInit()
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

export default redisClient;