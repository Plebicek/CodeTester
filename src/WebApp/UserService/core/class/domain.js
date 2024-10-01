import ClassModel from "./data.js"

export default class ClassDomain {
    static async index(req, res) {
        const classes = await ClassModel.getClassAndGradeByUserId(req.user.user_id)
        console.log(classes.Class.Grade_bridge)
        const grades = classes.Class.Grade_bridge
        return res.render("index", {
            grades: grades, user: {
                role: "user"
            }
        })
    }
}
