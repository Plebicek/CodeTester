import http, { createServer } from "http";
import dotenv from "dotenv";
import WebService from "./app.js";
import { createClient } from "redis";

import path from "path"
/* import taskQueueInit from "./helper/queue.js";
import testQueueInit from "./helper/test_queue.js"; */
import Config from "./config.js"
/* dotenv.config({ path: "./src/.env" });

let redisClient
let redisServer = createClient({ url: process.env.REDIS_URL });

export const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

 */
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

/* appInit(); */

async function main() {
  const webService = new WebService(Config.web).getApp()
  createServer(webService).listen(Config.web.port, () => console.log("server running"))
}

main()

/* export default redisClient; */