import express from 'express';
import router from './routes/indexRouter.js'
import path from 'path';
const __dirname = import.meta.dirname

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))

app.use(router)

app.get("/upload", function (req,res) {
    /* Save uploaded file in directory */
     res.send('hi')
})

app.get("/run/:id", function (req,res) {
    /* Run test by id */   
     res.send('hi') 
})

app.use(function(req,res) {
    console.log(res.errorMessage)
    res.status(404).send('err')
})





export default app