import passport from "passport"
import {loginUser, logoutUser, registerUser} from "../contollers/userController.js"
import {Router} from 'express'
import {Strategy} from "passport-microsoft"



passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET,
    callbackURL : "http://localhost:3000/login/OAuth/callback",
    scope: ['user.read'],

        // Microsoft specific options

        // [Optional] The tenant for the application. Defaults to 'common'. 
        // Used to construct the authorizationURL and tokenURL
    tenant: process.env.TENANT,
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile)
        console.log("acces token: " + accessToken)
        console.log("refresh token " +refreshToken)
        return done(null, profile)
    }
))


const router = Router()

router.get("/login/OAuth", passport.authenticate("microsoft"))
router.get("/login/OAuth/faliure", (req,res) =>res.send("wrong oauth"))
router.get("/login/OAuth/callback", passport.authenticate("microsoft", {session :false, successRedirect: "/protected", failureRedirect: "/login/OAuth/failure"}))
router.get("/protected", function(req,res,next) {
    console.log("user " +req.user)
    console.log("jwt token " + req.token)
    req.token ? next() : res.sendStatus(401)
},(req,res) => {
    res.send("hello")
})

router.get("/login", loginUser)
router.post("/login", loginUser)
router.get("/signup", registerUser)
router.post("/signup", registerUser)
router.get('/logout', logoutUser)
export default router