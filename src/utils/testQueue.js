import Bull from "bull";
import { redisClient } from "./../../index.js";
import { JAVA_TEST, JAVA_UPLOAD } from "../contollers/taskController.js";
import { copyFile, rename, rmSync, rm } from "node:fs";
import decompress from "decompress";
import { updateTest } from "../models/admin.js";

export let testQueue;

export async function initTestQueue() {
  try {
    testQueue = new Bull("test", "redis://127.0.0.1:6379", {
      limiter: { max: 1, duration: 1000 },
    });
  } catch (err) {
    throw new Error(err);
  }

  testQueue.process(2, async (job, done) => {
    let testId = job.data.test_id;
    let javaTestPath = JAVA_TEST + `test_${testId}.zip`;
    const javaUploadPath = JAVA_UPLOAD + `test_${testId}.zip`;
    copyFile(javaUploadPath, javaTestPath, (err) => {
      if (err) console.log("Error occured when copying files" + err);
      try {
        rmSync(javaUploadPath);
      } catch (err) {
        console.log(
          `While removing the file ${testId} error has occured ` + err
        ); //ToDo set to delayed queue
        return done();
      }
    });
    rename(javaTestPath, JAVA_TEST + `${testId}.zip`, (err) => {
      if (err) {
        console.log("Error when renaming id to main.zip" + err);
        return done();
      }
    });
    javaTestPath = JAVA_TEST + `${testId}.zip`;
    decompress(javaTestPath, JAVA_TEST + `${testId}`)
      .then((files) => {
        console.log("decompressed");
      })
      .catch((err) => {
        console.log("Error when decomprising " + err);
        return done();
      });
    rm(javaTestPath, (err) => {
      if (err) console.log("Error when removing file " + err);
    });
    await new Promise((resolve) =>
      setTimeout(async () => await updateTest(testId, job.data.task_id), 5000)
    );
  });

  testQueue.on("completed", async (job) => {
    await redisClient.del("bull:test:" + job.id);
  });
}

export async function addTestToQueue(object) {
  await testQueue.add(object);
}
