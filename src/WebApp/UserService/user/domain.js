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
 * */
export default class Client {
    static login(req, res) {
        console.log(req.baseUrl)
        return res.render("auth/login")
    }

    static logout(_, res) {
        res.clearCookie("auth")
        return res.redirect("/")
    }


    static auth(req, res) {
        res.cookie("auth", { "user": true }, { maxAge: 900000, onlyHttp: true })
        return res.redirect("/")
    }
}
