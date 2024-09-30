/**
 * Logged user object 
 * @class User
 */
export class User {
    isAuth;
    username;
    permision
    id;
    email;

    constructor(cookie) {
        this.cookie = cookie //ToDo: map cookie data to the user object
        this.isAuth = true
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
    static auth(req, res) {
        res.cookie("auth", { "user": true }, { maxAge: 900000, onlyHttp: true })
        return res.redirect("/")
    }
}
