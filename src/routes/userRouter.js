import {loginUser, logoutUser, registerUser} from "../contollers/userController.js"
import {Router} from 'express'
const router = Router()

router.get("/login", loginUser)
router.post("/login", loginUser)
router.get("/signup", registerUser)
router.post("/signup", registerUser)
router.get('/logout', logoutUser)
export default router