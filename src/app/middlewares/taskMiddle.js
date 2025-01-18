import dayjs from "dayjs";
import { getTaskById } from "../models/task.js";
import { createOverTimeAnswer } from "../models/answer.js";

export async function checkAnswerOvertime(req, res, next) {
    const { taskId, topicId } = req.params
    let task = await getTaskById(taskId, req.user.id)
    let resultOvertime = dayjs(task.task_due).diff(dayjs(), "s")
    let stats = {}

    if (task.answers.length <= 0) {
        if (resultOvertime <= 0) {
            if (req.method == "POST") {
                await createOverTimeAnswer(req.user.id, taskId)
                return res.redirect(`${req.baseUrl}/topic/${parseInt(topicId)}/task/${parseInt(taskId)}?msgUpload=` + encodeURIComponent("Přesčasové odevzdání"))

            } else if (req.method == "GET") {
                await createOverTimeAnswer(req.user.id, taskId)
                stats.pass = 0
                stats.fails = 0
                stats.total = 0
                stats.answer_overtime = 1
                stats.percentage = 0
                req.stats = stats
                return next()
            }
        } else {
            return next()
        }
    } else {
        if (task.answers[0].answer_overtime) {
            stats = task.answers[0]
            stats.pass = 0
            stats.fails = 0
            stats.total = stats.pass + stats.fails
            stats.percentage = Math.ceil((stats.pass / stats.total) * 100)

            if (isNaN(stats.percentage) || !isFinite(stats.percentage)) {
                stats.percentage = 0
            }
            req.stats = stats
        } else {
            stats = task.answers[0]
            stats.total = stats.pass + stats.fails
            stats.percentage = Math.round((stats.pass / stats.total) * 100)
            if (isNaN(stats.percentage) || !isFinite(stats.percentage)) {
                stats.percentage = 0
            }
            req.stats = stats
        }
        return next()
    }
}