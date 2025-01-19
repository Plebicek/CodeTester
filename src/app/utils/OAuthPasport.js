import { loadConfig } from "../../index.js";
import passport from "passport"
import { Strategy } from "passport-microsoft"

loadConfig(process.env.NODE_ENV)

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
