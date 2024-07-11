import { checkExistingAnswer, createAnswer } from "../models/answer.js";

export default async function checkOrCreateAnswer(req, res, next) {
  const userId = req.user.id
  const {taskId, topicId} = req.params
  const result = await checkAnswer(userId,taskId)
  if (!result) {
    await setAnswerToLocals(taskId, userId)
    return next();
  }
  return redirectExistingAnswer(req.baseUrl,topicId,taskId)
  

  /**
   * Check if answer does not exists 
   * @param {number} userId
   * @return {number} if exsits
   * @returns {boolean} if not exists
   */
  async function checkAnswer(userId, taskId){
    try {
      const result = await checkExistingAnswer(taskId, userId)
      if (!result) {return false} 
      return result.answer_id
    } catch (err) {
      console.log("Error occured while checking answer", err)
      return next(new Error("Could not check if existing answer exists"))
    }
  }

  /**
   * Redirect for existing answer 
   * @returns {string} url of redirect
   */
  function redirectExistingAnswer(url,topic,task) {
    return res.status(403).redirect(
      `${url}/topic/${topic}/task/${task}?msgUpload=` +
        encodeURIComponent("File uz byl odevzdan")
    );
  }


  async function setAnswerToLocals(taskId,userId) {
    let answer = await createAnswer(taskId, userId)
    if (answer) {
      req.locals.answerId = answer.answer_id
    }
  }
}
