import { Router } from "express";

const router = Router()

router.use("/", (req, res, next) => {
    console.log("user", req.user.isAuth);
    console.log("path core", req.baseUrl)
    if (req.user.isAuth) return next();
    return res.redirect("/user/login")
})

router.get("/", (_, res) => res.render("index", { grades: 0 }))

export default router