import { Router } from "express";


const router = Router()

const dockerHealth = function (req,res) {
    return res.status(200).end()
}

router.get("/health", dockerHealth)

export default router