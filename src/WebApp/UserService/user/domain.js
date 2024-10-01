import UserModel from "./data.js"

/**
 * Logged user object 
 * @class User
 */
export class User {
    user_isAuth;
    user_username;
    user_role;
    user_id;
    user_email;

    constructor(cookie) {
        console.log(cookie)
        this.cookie = cookie //ToDo: map cookie data to the user object
        this.isAuth = true
        this.user_id = cookie.user_id
        this.user_role = cookie.user_role
    }
}

/**
 *  Client class based view  
 *  @class Client 
 * */
export default class Client {
    /**
     * Login page get method view 
     * @static 
     * @param {*} req 
     * @param {*} res 
     * @returns render login page
     */
    static login(req, res) {
        return res.render("auth/login")
    }

    /**
     * Static logout logic 
     * @static 
     * @param {Request} _ 
     * @param {Response} res 
     * @returns redirect to homepage 
     */
    static logout(_, res) {
        res.clearCookie("auth")
        return res.redirect("/")
    }

    /**
     * Basic password type auth logic 
     * @static 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async auth(req, res) {
        const user = await UserModel.getUserById(1)
        if (!user) return res.redirect("/user/login")
        res.cookie("auth", { "user": { user_id: 1, user_role: "student" } }, { maxAge: 900000, onlyHttp: true })
        return res.redirect("/")
    }
}
