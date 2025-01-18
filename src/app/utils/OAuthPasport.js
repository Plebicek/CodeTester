import passport from "passport"
import { Strategy } from "passport-microsoft"
import dotenv from "dotenv"
dotenv.config();

export default passport.use(new Strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://odevzdani.workspace-sosceskybrod.cz/login/OAuth/callback",
    scope: ['user.read'],
    tenant: process.env.TENANT,
},
    async function (accessToken, refreshToken, profile, done) {
        return done(null, profile)
    }
))
