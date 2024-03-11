import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getTest(task_id) {
    let taskId = parseInt(task_id)
    if (isNaN(taskId)) {
        return new Error("getTest error occured, cannot parse test_id to int")
    }
    try {
        const test = await prisma.tests.findFirst({
            where : {
                task_id : task_id
            },
            select : {
                test_id : true,
            }
        })
        return test
    } catch(err) {
        return new Error("An Error occured in getTest" + err)
    }
}