import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import serveFavicon from "serve-favicon";
import coreRouter from "./core/entry.js"

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
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
  }

  _setEngine() {
    this.app.set("view engine", "ejs")
  }

  _setStatic() {
    this.app.use(express.static(path.join(process.cwd(), "public")));
    this.app.use(serveFavicon(path.join(process.cwd(), "public/images/", "favicon.ico")))
    this.app.set("view engine", "ejs");
  }

  _setRoutes() {
    this.app.use(coreRouter)
  }

  getApp() {
    return this.app
  }

}

