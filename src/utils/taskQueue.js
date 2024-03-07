import Bull from "bull";
import { redisClient } from "./../../index.js";

export let taskQueue;

export async function initTaskQueue() {
  try {
    taskQueue = new Bull("task", "redis://127.0.0.1:6379", {
      limiter: { max: 1, duration: 1000 },
    });
  } catch (err) {
    throw new Error(err);
  }
}

async function processTask(job, done) {
  //set asnwer to inqueue
  //start testing the task asnwer
  //done()
  console.log(`${job.jobId}`);
}

taskQueue.process(processTask);

taskQueue.on("completed", async () => {
  //sql to db that processed finished inqueue false
  //redis remove from db
});

export async function addTaskToQueue() {
  await taskQueue.add({ jobId: 1, foo: "task 1" });
}
