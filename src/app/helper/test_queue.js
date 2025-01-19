import Bull from "bull";
import testProcess from "./test.js";
import { config } from "dotenv";
config()

let testQueue;

/**
 * Task queue init function
 * Needs to be runned at the start of the app
 */
const testQueueInit = function (redisUrl) {
  try {
    testQueue = new Bull("test", redisUrl, {
      limiter: { max: 1, duration: 3000 },
    });
    testQueue.process(testQueueProcess);
  } catch (error) {
    throw new Error("could not create task queue");
  }
};

/**
 * Process function for queue stack
 */
const testQueueProcess = async function (job, done) {
  const { testId } = job.data;
  try {
    await testProcess({
      testId,
    });
    return done();
  } catch (err) {
    //remove test from db
    console.log("TestQueue error", err);
    done()
  }
};

export const setTaskToTestQueue = function (data) {
  getTestQueue().add(data);
};

export const getTestQueue = function () {
  return testQueue;
};

export default testQueueInit;