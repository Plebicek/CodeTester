import { Router } from "express";
import Client from "./domain.js";

const router = Router()

router.get("/login", Client.login)
router.post("/login", Client.auth)
router.get("/logout", Client.logout)
export default router

