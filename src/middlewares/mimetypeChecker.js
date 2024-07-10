import { removeAnswer } from "../models/answer.js"
import upload from "../utils/upload.js"

async function onlyZipMiddleware (req,res,next) {
    const redirect = function (url,topic,task) {
        return res.redirect(
            `${url}/topic/${topic}/task/${task}?error=` +
            encodeURIComponent("Nepodporovaný formát souboru, pouze .zip")
        );
    }

    const {topicId, taskId} = req.params

    try {
        await upload(req,res)
        return next()
    } catch (error) {
        await removeAnswer(req.user.id,req.locals.answerId) 
        return redirect(req.baseUrl, topicId, taskId)
    }
}

export default onlyZipMiddleware 