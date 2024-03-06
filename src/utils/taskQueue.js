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

async function processTask(job) {
  console.log(`${job.jobId}`);
}

taskQueue.process(processTask);

taskQueue.on("completed", async () => {});

export async function addTaskToQueue() {
  await taskQueue.add({ jobId: 1, foo: "bar 1" });
}
