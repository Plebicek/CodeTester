import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import serveFavicon from "serve-favicon";
import userServiceRouter from "./UserService/index.js"


export default class WebService {
  constructor(config) {
    this.app = express()
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
    this._setCookie()
  }

  _setEngine() {
    this.app.set("view engine", "ejs")
  }

  _setStatic() {
    this.app.use(express.static(path.join(process.cwd(), "public")));
    this.app.use(serveFavicon(path.join(process.cwd(), "public/images/", "favicon.ico")))
  }

  _setRoutes() {
    this.app.use(userServiceRouter)
    this.app.use((_, res) => {
      res.send("invalid url: 404")
    })
  }

  _setCookie() {
    this.app.use(cookieParser(this.config.cookie))
  }

  getApp() {
    return this.app
  }

}

