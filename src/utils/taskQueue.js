import Bull from "bull";
import { redisClient } from "./../../index.js";
import { JAVA_TEST, JAVA_UPLOAD } from "../contollers/taskController.js";
import { copyFile, rename, rmSync, rm } from "node:fs";
import { remoteIdFromQueue, setAnswerStats } from "../models/answer.js";
import getTest from "../models/test.js";
import decompress from "decompress";
import { exec } from "node:child_process";

export let taskQueue;

export async function initTaskQueue() {
  try {
    taskQueue = new Bull("task", "redis://127.0.0.1:6379", {
      limiter: { max: 1, duration: 1000 },
    });
  } catch (err) {
    throw new Error(err);
  }

  taskQueue.process(2, async (job, done) => {
    let testId = await getTest(job.data.task_id);
    if (!testId) {
      console.log(
        "While processing queue, test id doesnt exists in with task id" +
          job.data.task_id
      );
      return done();
    }

    let userInputPath = `${JAVA_UPLOAD + job.data.answer_id}.zip`;
    let javaTestPath = `${JAVA_TEST + testId.test_id}/src/`;
    let childPath = process.cwd() + `/java/tests/${testId.test_id}/`;

    copyFile(
      userInputPath,
      javaTestPath + job.data.answer_id + ".zip",
      (err) => {
        if (err) console.log(err); //ToDo set to delayed queue
      }
    );

    rename(
      javaTestPath + job.data.answer_id + ".zip",
      javaTestPath + "main.zip",
      (err) => {
        if (err) {
          console.log("Error when renaming id to main.zip" + err);
          return done();
        }
      }
    );

    decompress(javaTestPath + "main.zip", javaTestPath)
      .then((files) => {
        rm(javaTestPath + "main.zip", (err) => {
          if (err) console.log(err);
        });
      })
      .catch((err) => {
        console.log("decompresd err " +err);
        return done();
      });

    let test = exec("mvn -q test", { cwd: childPath });
    let data = "";

    test.stdout.on("data", (chunks) => {
      data += chunks;
    });

    test.on("error", (err) => {
      console.log("test.on error: " + err);
    });
    test.on("exit", async () => {
      let jsonData = JSON.parse(data);
      jsonData.answer_id = job.data.answer_id;
      await setAnswerStats(jsonData, parseInt(job.data.answer_id));
      /*rm(javaTestPath + "main", {recursive : true, force : true},(err) => {
        console.log("removing files")
        if (err) console.log("while removing tested main file " + err)
        return done();
      })
      */
     return done()
    });
  });

  taskQueue.on("completed", async (job) => {
    let time = job.processedOn - job.timestamp;
    /* remove answer queue id */
    await remoteIdFromQueue(job.data.answer_id);
    await redisClient.del("bull:task:" + job.id);
    console.log(`The proccess id: ${job.data.answer_id} took ${time}s`);
  });
}

export async function addTaskToQueue(object) {
  await taskQueue.add(object);
}
