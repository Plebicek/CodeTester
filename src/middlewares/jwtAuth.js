import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config({path:"./../.env"})

export default function jwtAuth (req,res, next) {
    const token = req.cookies.auth
    try {
        const user = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = user
        next()
    } catch (err) {
        res.clearCookie('auth')
        return res.redirect("/login")
    }
}