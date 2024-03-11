import {getGradeAndTopicsById} from "../models/grade.js";

export async function viewGrade(req,res) {
    let gradeId = parseInt(req.params.gradeId)
    if (isNaN(gradeId)) {
            return res.redirect("/")
    }
    try {
        let grade = await getGradeAndTopicsById(gradeId)
        if (!grade) {
            return res.redirect("/")
        }
        return res.render("grade", { grade : grade, "topics" : grade.topics, "path" : req.path})
    } catch (err) {
        return res.status(500).redirect("/")
    }
}