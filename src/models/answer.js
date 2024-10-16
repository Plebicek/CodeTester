import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @param {object} stats - pass, fail, error, total
 * @param {Number} answerId
 */
export async function setAnswerStats(stats, answerId) {
  if (!stats) {
    return null;
  }
  try {
    return prisma.answers.update({
      where: {
        answer_id: parseInt(answerId),
      },
      data: {
        fails: parseInt(stats?.fail),
        pass: parseInt(stats?.pass),
        answer_total: parseInt(stats?.total)
      },
    });
  } catch (err) {
    console.log(`An Error occured in setAnswerStats ${err}`);
    return err;
  }
}

export async function checkExistingAnswer(taskId, userId) {
  try {
    const isAnswer = await prisma.answers.findFirst({
      where: {
        user_id: parseInt(userId),
        task_id: parseInt(taskId),
      },
      select: {
        answer_id: true,
      },
    });
    if (isAnswer) {
      return isAnswer;
    }
    return false;
  } catch (err) {
    return new Error("Error occured in CheckExistsingAnswer");
  }
}

export async function createAnswer(taskId, userId) {
  try {
    return await prisma.answers.create({
      data: {
        task_id: parseInt(taskId),
        user_id: parseInt(userId),
      },
    });
  } catch (err) {
    console.log("Error occured in createAnswer", err);
    return false;
  }
}

export async function createOverTimeAnswer(userId, taskId) {
  try {
    return await prisma.answers.create({
      data: {
        task_id: parseInt(taskId),
        user_id: parseInt(userId),
        pass: 0,
        fails: 1,
        answer_total: 0,
        answer_overtime: true,
      },
    });
  } catch (err) {
    console.log(err);
    return err;
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
    return 1;
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
    return 1;
  } catch (err) {
    return new Error("Error occured in removeAnswerFromQueue");
  }
}

export async function remoteIdFromQueue(answerId) {
  try {
    await prisma.answers.update({
      where: {
        answer_id: answerId,
      },
      data: {
        answer_inQueue: null,
      },
    });
  } catch (err) {
    return new Error("Error has occured in remoteIdFromQueue");
  }
}

export async function getAnswerStatsByAnswerId(id) {
  if (!id) {
    return null;
  }
  let answerId = parseInt(id);
  try {
    let answer = await prisma.answer_stats.findFirst({
      where: {
        answer_id: answerId,
      },
      select: {
        pass: true,
        fails: true,
        answer_id: true,
        answer_stat_id: true,
        answer_overtime: true,
      },
    });
    return answer;
  } catch (err) {
    console.log("get getAnswerStats error occured " + err);
    return err;
  }
}

export async function removeAnswer(userId, answerId) {
  console.log("users and tatsks", userId, answerId);
  if (!userId || !answerId) {
    return null;
  }
  try {
    return await prisma.answers.delete({
      where: {
        user_id: parseInt(userId),
        answer_id: parseInt(answerId),
      },
    });
  } catch (err) {
    console.log(err);
    return err;
  }
}
