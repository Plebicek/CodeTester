import userController from "../contollers/userController.js"
import {Router} from 'express'
const router = Router()

router.get("/users", userController)
export default router