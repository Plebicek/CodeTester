import { ClassModel, TopicModel } from "./data.js"

/**
 * Abstract class domain for logic
 * Dont initalize
*/
class AbstractDomain {
    constructor() {
        if (new.target.name === AbstractDomain.class) {
            throw new Error("cant initalize this")
        }
    }
    static async index() { }
    static async page() { }
}

/**
 * Base middleware for all core routes. 
 * @method isAuth - static function to check autohirzed users
 */
export class IndexDomain {
    static isAuth(req, res, next) {
        if (req.user.isAuth) return next();
        return res.redirect("/user/login")
    }
}

/**
 *  Class logic
 *  @method index - load user default class with grades
 */
export class ClassDomain {
    /**
     *  TODO: set lock on unpublished grades  
     */
    static async index(req, res, next) {
        const classes = await ClassModel.getClassAndGradeByUserId(req.user.user_id)
        if (!classes) return next(new Error("404 Resource not found"))
        const grades = classes.Class.Grade_bridge
        return res.render("index", {
            grades: grades, classes: classes.class_id, user: {
                role: "user"
            }
        })
    }
}


/**
 * Topic logic
 * @method index - load topics and assignments by users group and current grade id
 */
export class TopicDomain {
    static async index(req, res, next) {
        const class_id = req.user.user_class_id
        const grade_id = req.params.gradeId
        const topicsWithAssignments = await TopicModel.getTopicsWithAssignments(class_id, grade_id)
        console.log(topicsWithAssignments)
        if (!topicsWithAssignments) return next(new Error("404 Resource not found"))
        return res.json({ data: topicsWithAssignments })
    }
}

/**
 * Assignment logic
 * @method index - load specific assignemnt by assignment id 
 */
export class AssignmentDomain {
    static async page(req, res) {
        return res.send("assignment not yet finished")
    }

}