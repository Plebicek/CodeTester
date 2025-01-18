import http from "http";
import dotenv from "dotenv";
import app from "./app/app.js";
import { createClient } from "redis";
import taskQueueInit from "./app/helper/queue.js";
import testQueueInit from "./app/helper/test_queue.js";
dotenv.config({ path: "./src/.env" });

let redisClient
let redisServer = createClient({ url: process.env.REDIS_URL, socket: { keepAlive: true }, pingInterval: 5000 });

export const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

async function appInit() {
  try {
    redisClient = await redisServer.connect();
    redisClient.on("error", (err) => {
      console.log(`Redis error occurs: ${err}`)
    })
    taskQueueInit()
    testQueueInit()
    server.listen(PORT, function () {
      console.log(`SERVER RUNNING... http://localhost:${PORT}/`);
    });
  } catch (err) {
    throw new Error("Init app error occured " + err);
  }
}

appInit();

export default redisClient;