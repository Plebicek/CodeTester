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
    return answer
  } catch (err) {
    return new Error("Error occured in createAnswer " + err);
  }
}

export async function setAnswerToQueue(answerId) {
  try {
    let answer = await prisma.answers.update({
      where: {
        answer_id: answerId,
      },
      data: {
        answer_inQueue: 1,
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
        answer_inQueue: 0,
      },
    });
  } catch (err) {
    return new Error("Error occured in removeAnswerFromQueue");
  }
}
