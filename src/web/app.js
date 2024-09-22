import express from "express"
import logginHandler from "./helper/loggingHandler.js"
import helmet from "helmet"
import { join } from "path"

const app = express()

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(logginHandler)


app.set("views", join(process.cwd(), "./../public/sites/"))
app.set("view engine", "ejs")

app.use("/", (req, res) => { res.render("index") })

export default app