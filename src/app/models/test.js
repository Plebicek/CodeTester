import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function getTest(task_id) {
    try {
        const test = await prisma.tests.findFirst({
            where : {
                task_id : parseInt(task_id)
            },
            select : {
                test_id : true,
            }
        })
        return test.test_id
    } catch(err) {
        return new Error("An Error occured in getTest" + err)
    }
}