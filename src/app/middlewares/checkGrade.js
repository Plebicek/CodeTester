import { checkGrade } from "../models/grade.js";

export async function isGrade(req,res,next) {
    let gradeId = parseInt(req.params.gradeId);
    let isShown = await checkGrade(gradeId)
    if (!isShown.grade_show) {
        return res.redirect("/")
    } else {
        return next()
    }    
}