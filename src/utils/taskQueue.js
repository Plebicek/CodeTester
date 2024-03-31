import Bull from "bull";
import { redisClient } from "./../../index.js";
import { JAVA_TEST, JAVA_UPLOAD } from "../contollers/taskController.js";
import { copyFile, rename, rmSync, rm, stat } from "node:fs";
import { remoteIdFromQueue, removeAnswer, setAnswerStats } from "../models/answer.js";
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

    try {
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

    await decompress(javaTestPath + "main.zip", javaTestPath+"main")
      .then(() => {
        rm(javaTestPath + "main.zip", (err) => {
          if (err) console.log(err);
        });
      })
      .catch(async (err) => {
        console.log("decompresd err " +err);
        await removeAnswer(job.data.user_id, job.data.answer_id)
        rmSync(javaTestPath + "main.zip", {force : true, recursive : true})
        return done()
      });

    let test = exec("mvn clean -q test", { cwd: childPath });
    let data = "";

    test.stdout.on("data", (chunks) => {
      data += chunks;
    });

    test.on("exit", async (code) => {
      if (code !== 0) {
        console.log(code)
        await removeAnswer(job.data.user_id, job.data.answer_id)
        rmSync(javaTestPath + "main", {force : true, recursive : true})
        return done()
      }
      let processedData = data.match(/\{"fail":\d+,"total":\d+,"pass":\d+\}/)
      let jsonData = JSON.parse(processedData);
      jsonData.answer_id = job.data.answer_id;

      let stats = await setAnswerStats(jsonData, parseInt(job.data.answer_id));
      console.log(stats) 

      rmSync(javaTestPath + "main", {force : true, recursive : true})

      return done() 
    });
    } catch(err) {
      console.log("catch error in queue ", err)
      await removeAnswer(job.data.user_id, job.data.answer_id)
      rmSync(javaTestPath + "main", {force : true, recursive : true})
      return done()
    }

    
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
