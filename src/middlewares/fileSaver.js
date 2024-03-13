import { checkExistingAnswer } from "../models/answer.js";

export default async function checkExistingFile(req, res, next) {
  let taskId = parseInt(req.params.taskId);
  let topicId = parseInt(req.params.topicId);
  let isAnswer = await checkExistingAnswer(taskId, parseInt(req.user.id));
  if (isAnswer?.exists) {
    return res.redirect(
      `${req.baseUrl}/topic/${topicId}/task/${taskId}?msgUpload=` +
        encodeURIComponent("File uz byl odevzdan")
    );
  } else {
    next();
  }
}
