import { checkExistingAnswer } from "../models/answer.js";

export default async function checkExistingFIle(req,res,next) {
    let taskId =  parseInt(req.params.taskId)
    let isAnswer = await checkExistingAnswer(taskId, parseInt(req.user.id) )
    console.log(isAnswer)
    if (isAnswer?.exists) {
        return res.json("File already exists")
    } else {
        next()
    }
}