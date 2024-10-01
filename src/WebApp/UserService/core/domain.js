class Index {
    static index(_, res) {
        return res.render("index", {
            grades: 0, user: {
                role: "user"
            }
        })
    }

    static isAuth(req, res, next) {
        if (req.user.isAuth) return next();
        return res.redirect("/user/login")
    }
}

export default Index