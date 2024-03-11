import Bull from "bull";
import { redisClient } from "./../../index.js";
import { JAVA_TEST, JAVA_UPLOAD } from "../contollers/taskController.js";
import {copyFile, rename, rmSync} from "node:fs"
import {remoteIdFromQueue} from "../models/answer.js"
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


  taskQueue.process(2,async (job, done) => {
    console.log(job)

    let testId = await getTest(job.data.task_id)
    if (!testId.test_id) {
      console.log("While processing queue, test id doesnt exists in with task id" + job.data.task_id)
      done()
    }

    let userInputPath = `${JAVA_UPLOAD+job.data.answer_id}.zip`
    let javaTestPath = `${JAVA_TEST+testId.test_id}/src/`
    let childPath = process.cwd()+`/java/tests/${testId.test_id}/`
    console.log(javaTestPath)

    copyFile(userInputPath, javaTestPath+job.data.answer_id+".zip",  (err) => { //PODMINKA uzivatel musi odevzdat main.zip
      if (err) console.log(err)   //ToDo set to delayed queue 
      try {
        rmSync(userInputPath)
      } catch(err) {
        console.log(`While removing the file ${job.data.answer_id} error has occured ` + err) //ToDo set to delayed queue
      }
    })

    rename(javaTestPath+job.data.answer_id+".zip", javaTestPath+"main.zip", (err) => {
      if (err) {
        console.log("Error when renaming id to main.zip" + err)
        done()
      }
    })

    decompress(javaTestPath+"main.zip", javaTestPath).then(files => {
      console.log("decompressed")
    }
    ).catch(err => {
      console.log(err)
      done()
    })

    rmSync(javaTestPath+"main.zip")

    let test = exec("mvn test",{cwd: childPath})
    test.on("data", (data)=> {
      console.log("data: " +data)
    }) 
    test.on("exit", () => {
      done()
    })
  });

  taskQueue.on("completed", async (job) => {
    let time = job.processedOn  - job.timestamp
    /* remove answer queue id */
    await remoteIdFromQueue(job.data.answer_id)
    await redisClient.del("bull:task:"+job.id)
    console.log(`The proccess id: ${job.data.answer_id} took ${time}s`)
  });
}


export async function addTaskToQueue(object) {
  await taskQueue.add(object);
}

