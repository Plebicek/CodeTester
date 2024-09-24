import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import serveFavicon from "serve-favicon";
/* import router from "./routes/index.js"; */
/* import UserRouter from "./user/entry.js"*/
import coreRouter from "./core/entry.js"

export default class WebService {
  constructor(config) {
    this.app = express()
    console.log(this.app.get("view engine"))
    /* this.app.set("views", process.cwd() + "/views"); */
    this.config = config
    this._init()
  }

  _init() {
    this._setMiddlewares()
    this._setEngine()
    this._setStatic()
    this._setRoutes()
  }

  _setMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
  }

  _setEngine() {
    this.app.set("view engine", "ejs")
    /*  this.app.set("view engine", "ejs");
     this.app.set("views", process.cwd() + "/views"); */
  }

  _setStatic() {
    this.app.use(express.static(path.join(process.cwd(), "public")));
    this.app.use(serveFavicon(path.join(process.cwd(), "public/images/", "favicon.ico")))
    this.app.set("view engine", "ejs");
  }

  _setRoutes() {
    this.app.use(coreRouter)
    /* this.app.use(UserRouter) */
    /* this.app.use(router); */
  }

  getApp() {
    return this.app
  }

}

