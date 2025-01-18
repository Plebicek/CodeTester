import express from "express";
import cookieParser from "cookie-parser";
import { join } from "path";
import livereload from "livereload";
import liveReloadServer from "connect-livereload";
import serveFavicon from "serve-favicon";
import router from "./routes/index.js";
import rootDir from "./utils/paths.js"

const env: String = process.env.NODE_ENV || "development";

const app = express();

if (env === "development") {
  const liveServer = livereload.createServer();
  liveServer.server.once("connection", () => {
    setTimeout(() => {
      liveServer.refresh("/");
    }, 100);
  });
  app.use(liveReloadServer());
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.set("view engine", "ejs");
app.set("views", join(rootDir, "/views"));

app.use(express.static(join(rootDir, "public")));
app.use(serveFavicon(join(rootDir, "public/images/", "favicon.ico")))

app.use(router);

export default app;
