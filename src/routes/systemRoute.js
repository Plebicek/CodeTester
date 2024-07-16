import { Router } from "express";
import { server } from "../../index.js";

const router = Router()

const dockerHealth = function (req,res) {
    return res.status(200).end()
}

router.get("/health", dockerHealth)
router.get("/down", (req,res) => {server.close()} )

export default router