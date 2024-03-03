import Bull from "bull"
import {createClient} from "redis"

export let taskQueue


export async function startQueue() {
    try {
        const redis = createClient();
        taskQueue = new Bull("task", 'redis://127.0.0.1:6379', {limiter : {max : 1, duration : 1000}})
        await redis.connect();
    } catch (err) {
        throw new Error(err)
    }
}   


export async function addToTaskQueue(object) {
    await taskQueue.add({jobId : 1, foo : "bar 1"})
}

