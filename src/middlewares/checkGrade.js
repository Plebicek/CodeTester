import { checkGrade } from "../models/grade.js";

export async function isGrade(req,res,next) {
    let gradeId = parseInt(req.params.gradeId);
    let isShown = await checkGrade(gradeId)
    console.log(gradeId, isShown)
    if (!isShown.grade_show) {
        return res.redirect("/")
    } else {
        return next()
    }    
}