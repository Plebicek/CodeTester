class User {
    constructor() { }

    getLogin(_, res) {
        return res.render("auth/login")
    }

    postLogin(_, res) {

    }
}

export default new User()