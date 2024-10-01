import ClassModel from "./data.js"

export default class ClassDomain {
    static async index(req, res) {
        const classes = await ClassModel.getClassByUserId(req.user.user_id)
        console.log(classes)
        return res.render("index", {
            grades: 0, user: {
                role: "user"
            }
        })
    }
}
