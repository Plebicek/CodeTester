import { Router } from "express";
import userRouter from "./user/entry.js"
import coreRouter from "./core/entry.js"
import { User } from "./user/domain.js"

/**
 * Anonymus user object
 * @clas Annonymus
 */
class Annonymus {
    static isAuth = false
}

const setUser = function (req, res, next) {
    console.log("set user coookies", req.cookies)
    const authCookie = req.cookies.auth
    if (authCookie?.user) {
        req.user = new User(authCookie)
        return next()
    }
    req.user = Annonymus
    return next()
}

const router = Router()

router.use("/", setUser)
router.use("/user/", userRouter)
router.use("/", coreRouter)

export default router