import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createAnswer(taskId, userId) {
  try {
    let answer = await prisma.answers.create({
      data: {
        task_id: taskId,
        user_id: userId,
      },
    });
  } catch (err) {
    return new Error("Error occured in createAnswer");
  }
}

export async function setAnswerToQueue(answerId, queueId) {
  try {
    let answer = await prisma.answers.update({
      where: {
        answer_id: answerId,
      },
      data: {
        answer_inQueue: queueId,
      },
    });
  } catch (err) {
    return new Error("Error occured in setAnswerToQueue");
  }
}

export async function removeAnswerFromQueue(answerId) {
  try {
    let answer = await prisma.answers.update({
      where: {
        answer_id: answerId,
      },
      data: {
        answer_inQueue: null,
      },
    });
  } catch (err) {
    return new Error("Error occured in removeAnswerFromQueue");
  }
}
