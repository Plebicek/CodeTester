import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getTopicsTasks(topicId) {
  try {
    let tasks = await prisma.topics.findFirst({
      where: {
        topic_id: topicId,
      },
      select: {
        topic_name: true,
        tasks: {
          where: {
            topic_id: topicId,
          },
          select: {
            task_title: true,
            task_id: true,
          },
        },
      },
    });
    return tasks;
  } catch (err) {
    return new Error("The getTopicsTasks query failed");
  }
}

export async function getTaskById(taskId) {
  try {
    let task = await prisma.tasks.findFirst({
      where: {
        task_id: taskId,
      },
      select: {
        task_title: true,
        task_description: true,
        task_due: true,
        task_id: true,
        task_finish_date: true,
        task_begin_date: true,
        task_lock: true,

        answers: {
          where: {
            task_id: taskId,
          },
          select: {
            answer_id: true,
            task_id: true,
            answer_stats: {
              where: {
                answer_stat_id: taskId,
              },
              select: {
                fail: true,
                pass: true,
              },
            },
          },
        },
      },
    });
    return task;
  } catch (err) {
    return new Error("The getTaskById query failed");
  }
}
