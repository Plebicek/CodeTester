import Bull from "bull";
//import { redisClient } from "./../../index.js";
import runProcess from "./process.js";

let taskQueue;

/**
 * Task queue init function
 * Needs to be runned at the start of the app
 */
const taskQueueInit = function() {
    try {
        taskQueue = new Bull("task", process.env.REDIS_URL, {limiter:{max:1, duration:3000}})
        taskQueue.process(taskQueueProcess)
    } catch (error) {
        throw new Error("could not create task queue")
    }
}

/**
 * Process function for queue stack 
 */
const taskQueueProcess = async function(job,done) {
    console.log("jobs data", job.data)
    const {fileId, testId} = job.data
    try {
        let result = await runProcess({filename : `${fileId}.zip`, testFolder:testId})
        console.log(result) 
        return done()
    } catch (err) {
        console.log("taskQueueProcess error", err)
    } 
}

export const setTaskToQueue = function(data) {
   getTaskQueue().add(data)
}

export const getTaskQueue = function() {
    return taskQueue
}

export default taskQueueInit