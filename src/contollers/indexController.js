import getClasses from "../models/task.js";

export async function homepage(req,res) {
    const classesQuery = await getClasses(req.user.id)
    let classes =  classesQuery.group_bridges[0].groups.grade_bridges
    console.log(classesQuery.group_bridges[0].groups.grade_bridges)
    res.render("index", classes)
}