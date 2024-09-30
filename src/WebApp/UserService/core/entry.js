import { Router } from "express";

const router = Router()

router.use("/", (req, res, next) => {
    if (req.user.isAuth) return next();
    return res.redirect("/user/login")
})

router.get("/", (_, res) => res.render("index", { grades: 0 }))

export default router