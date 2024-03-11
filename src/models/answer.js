import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function checkExistingAnswer(taskId, userId) {
  try {
    let isAnswer = await prisma.answers.findFirst({
      where : {
        user_id : userId,
        task_id : taskId
      },
      select : {
        answer_id: true
      }
    })
    if (isAnswer) {
      isAnswer.exists = true
      return isAnswer
    } else {
      return 0
    }
     
  } catch (err) {
   return new Error("Error occured in CheckExistsingAnswer") 
  }
}

export async function createAnswer(taskId, userId) {
  let isAnswer = await checkExistingAnswer(taskId, userId)
  if (isAnswer) return isAnswer

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
    await prisma.answers.update({
      where: {
        answer_id: answerId,
      },
      data: {
        answer_inQueue: queueId,
      },
    });
    return 1
  } catch (err) {
    return new Error("Error occured in setAnswerToQueue");
  }
}

export async function removeAnswerFromQueue(answerId) {
  try {
    await prisma.answers.update({
      where: {
        answer_id: answerId,
      },
      data: {
        answer_inQueue: null,
      },
    });
    return 1
  } catch (err) {
    return new Error("Error occured in removeAnswerFromQueue");
  }
}

export async function remoteIdFromQueue(answerId) {
  try{ 
    await prisma.answers.update({
      where: {
        answer_id : answerId
      },
      data : {
        answer_inQueue : null
      }
    })
  } catch(err) {
    return new Error("Error has occured in remoteIdFromQueue")
  }
}