import {loginUser, logoutUser, registerUser, viewLogin, viewRegisterUser} from "../contollers/userController.js"
import {Router} from 'express'
const router = Router()

router.post("/login", loginUser)
router.get("/login", viewLogin)
router.get("/signup", viewRegisterUser)
router.post("/signup", registerUser)
router.get('/logout', logoutUser)
export default router