import Bull from "bull";
import { redisClient } from "./../../index.js";
import { JAVA_TEST, JAVA_UPLOAD } from "../contollers/taskController.js";
import decompress from "decompress";
import { removeTestUpload, updateTest } from "../models/admin.js";
import path from "path"
import { copyFileSync, rmSync } from "fs";
import { copyFile, mkdir, readdir, stat } from "fs/promises";
import dotenv from "dotenv";
dotenv.config({ path: process.env.PWD+"./src/.env" });
export let testQueue;

export async function initTestQueue() {
  try {
    testQueue = new Bull("test", process.env.REDIS_URL, {
      limiter: { max: 1, duration: 1000 },
    });
  } catch (err) {
    throw new Error(err);
  }

  testQueue.process(2, async (job, done) => {
    const testId = job.data.test_id;
    const sourceFolder = `./java/tests/${testId}/project`;
    const destinationFolder =  `./java/tests/${testId}/`;
    const projectZip = path.join(process.cwd()+"/java/project.zip")
    const javaProject = JAVA_TEST + `project.zip`

  try {
    copyFileSync(projectZip, javaProject);

    await decompress(javaProject , JAVA_TEST + `${testId}`);

    await copyFolder(sourceFolder, destinationFolder,testId)
      .then(() => {
        rmSync(JAVA_TEST + `${testId}/project`, {force : true, recursive : true})
      })
      .catch((err) => console.error(err));

    rmSync(javaProject)

    copyFileSync(JAVA_UPLOAD + `test_${testId}.zip`, JAVA_TEST + `${testId}/src/test.zip`)

    await decompress(JAVA_TEST + `${testId}/src/test.zip`, JAVA_TEST + `${testId}/src/test`)

    rmSync(JAVA_TEST + `${testId}/src/test.zip`)
    rmSync(JAVA_UPLOAD + `test_${testId}.zip`)
    
    await updateTest(testId, job.data.task_id)  

    return done() 

  } catch (err) {
    console.log(err)
    await removeTestUpload(testId)
    return done() 
  }

    
  });

  testQueue.on("completed", async (job) => {
    await redisClient.del("bull:test:" + job.id);
  });
}

export async function addTestToQueue(object) {
  await testQueue.add(object);
}

async function copyFolder(source, destination,testId) {
  try {
    const files = await readdir(source);
    for (let file of files) {
      const sourcePath = path.join(source, file); 
      const destPath = path.join(destination, file);
      const stats = await stat(sourcePath);

      if (stats.isDirectory())  {
        await mkdir(destPath, { recursive: true }); 
        await copyFolder(sourcePath, destPath,testId); 
      } else {
        await copyFile(sourcePath, destPath); 
      }
    }
  } catch (err) {
    console.error("Error copying folder:", err);
    return await removeTestUpload(testId)
  }
}