import Bull from "bull";
import runProcess from "./process.js";
import { config } from "dotenv";
config()
let taskQueue;

/**
 * ToDo: Reimplement this function to put all files to queue. Add priority level 
 * on admin uploaded tests files. 
 * 
 * Task queue init function
 * Needs to be runned at the start of the app
 */
const taskQueueInit = function () {
  try {
    taskQueue = new Bull("task", process.env.REDIS_URL, {
      limiter: { max: 1, duration: 3000 },
    });
    taskQueue.process(taskQueueProcess);
  } catch (error) {
    throw new Error("could not create task queue");
  }
};

/**
 * Process function for queue stack
 */
const taskQueueProcess = async function (job, done) {
  const { fileId, testId, userId } = job.data;
  try {
    await runProcess({
      fileId,
      testId,
      userId,
    });
    return done();
  } catch (err) {
    console.log("taskQueueProcess error", err);
  }
};

export const setTaskToQueue = function (data) {
  getTaskQueue().add(data);
};

export const getTaskQueue = function () {
  return taskQueue;
};

export default taskQueueInit;
