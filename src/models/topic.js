import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getTopicsById(gradeId) {
  try {
    let topics = await prisma.topics.findMany({
      where: {
        grade_id: gradeId,
      },
      select: {
        topic_id: true,
        topic_name: true,
      },
    });
    return topics;
  } catch (err) {
    return new Error("The SQL query for getTopicsFromGradeId failed");
  }
}

export async function getTasksByTopicIds(topicIds) {
  try {
    let tasks = await prisma.tasks.findMany({
      where: {
        topic_id: { in: topicIds },
      },
      select: {
        task_title: true,
        task_id: true,
        topic_id: true,
      },
    });
    return tasks;
  } catch (err) {
    console.log(`Error occured in getTasksByTopicIds ` + err);
    return err;
  }
}

export async function getTopicsWithTasks(id) {
  let gradeId = parseInt(id);
  try {
    let result = await prisma.grades.findFirst({
      where: {
        grade_id: gradeId,
      },
      select: {
        grade_name: true,
        topics: {
          topic_name: true,
          topic_id: true,
          tasks: {
            task_title: true,
            task_id: true,
            task_lock: true,
          },
        },
      },
    });
    return result;
  } catch (err) {
    console.log(`Error occured in getTopicsWithTasks ${err}`);
    return err;
  }
}
