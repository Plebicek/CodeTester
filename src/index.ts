
import http from "http";
import { config} from "dotenv";
import app from "./app/app.js";
import taskQueueInit from "./app/helper/queue.js";
import testQueueInit from "./app/helper/test_queue.js";
import { join } from "path";

type Stage = "development" | "production"

export function loadConfig(stage: Stage ) {
  const path: string = process.cwd()
  if (stage === "development") {
    return config({path : join(path, ".env.local.dev")}) 
  } else if (stage === "production") {
    return config({path : join(path, ".env.prod")}) 
  } else {
    throw new Error("NODE_ENV is undefined, make shure is added in env or as cli flag")
  }
}

//let redisClient
//let redisServer = createClient({ url: process.env.REDIS_URL, socket: { keepAlive: 1}, pingInterval: 5000 });

export const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

async function appInit() {
  loadConfig(process.env.NODE_ENV as Stage)
  try {
    //redisClient = await redisServer.connect();
    /* redisClient.on("error", (err) => {
      console.log(`Redis error occurs: ${err}`)
    }) */
    taskQueueInit(process.env.REDIS_URL)
    testQueueInit(process.env.REDIS_URL) 
    server.listen(PORT, function () {
      console.log(`SERVER RUNNING... http://localhost:${PORT}/`);
    });
  } catch (err) {
    throw new Error("Init app error occured " + err);
  }
}

appInit();

//export default redisClient;