import express from 'express';
import cookieParser from 'cookie-parser';
import router from './routes/index.js'
import path from 'path';
const __dirname = import.meta.dirname

const app = express()

app.use(express.json(process.env.COOKIE_SECRET))

app.use(express.urlencoded({extended:false}))

app.use(cookieParser())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(router) 

app.use(function(req,res) {
    console.log(res.errorMessage)
    res.status(404).send('err')
})





export default app