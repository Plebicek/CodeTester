import { Router } from "express";
import User from "./domain.js"

const router = Router()

/* router.get("/login", User.getLogin/* loginUser ) 
router.get("/login/OAuth", passport.authenticate("microsoft"))
router.get("/login/OAuth/failure", (req, res) => res.send("wrong oauth"))
router.get("/login/OAuth/callback", passport.authenticate("microsoft", { session: false, failureRedirect: "/login/OAuth/failure" }), createOrFindByOAuth)

router.post("/login", loginUser)
router.get("/signup", registerUser)
router.post("/signup", registerUser)
router.get("/logout", logoutUser) */
export default router