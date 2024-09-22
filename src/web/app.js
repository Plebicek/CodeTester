import express from "express"
import helmet from "helmet"

export default class WebService {
    constructor(config) {
        this.app = express()
        this.config = config
        this._init()
    }

    _init() {
        if (!this.config) throw new Error("WebService Configure is not defined")
        this._initMiddlewares()
        this._initRoutes()

    }

    _initRoutes() {
        this.app.get("/", (_, res) => {
            res.send("hello")
        })
        this.app.use("/", (_, res) => res.send("wrong url"))
    }

    _initMiddlewares() {
        this.app.use(helmet())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
    }

    getApp() {
        return this.app
    }
}


/* app.use(logginHandler)


app.set("views", join(process.cwd(), "./../public/sites/"))
app.set("view engine", "ejs")

app.use("/", (req, res) => { res.render("index") })
 */