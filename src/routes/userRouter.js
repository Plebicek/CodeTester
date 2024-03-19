import passport from "../utils/OAuthPasport.js"
import {loginUser, logoutUser, registerUser, createOrFindByOAuth} from "../contollers/userController.js"
import {Router} from 'express'

const router = Router()

router.get("/login/OAuth", passport.authenticate("microsoft"))
router.get("/login/OAuth/failure", (req,res) =>res.send("wrong oauth"))
router.get("/login/OAuth/callback", passport.authenticate("microsoft", {session :false, failureRedirect: "/login/OAuth/failure"}), createOrFindByOAuth)

router.get("/login", loginUser)
router.post("/login", loginUser)
router.get("/signup", registerUser)
router.post("/signup", registerUser)
router.get('/logout', logoutUser)
export default router