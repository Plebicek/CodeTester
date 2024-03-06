import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function getTopicsById(gradeId) {
    try {
        let topics = await prisma.topics.findMany({
        where: {
            grade_id : gradeId,
        },
        select : {
            topic_id : true,
            topic_name: true,
        }})        
        return topics
    } catch (err) {
        return new Error("The SQL query for getTopicsFromGradeId failed")
    }
}