import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import app from "../app.js";
dotenv.config({ path: "./../.env" });

export default function jwtAuth(req, res, next) {
  const token = req.cookies.auth;
  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = user;
    app.locals.user = user;
    next();
  } catch (err) {
    res.clearCookie("auth");
    return res.redirect("/login");
  }
}

export async function isAdmin(req, res, next) {
  if (req.user.role == "admin") {
    return next();
  } else {
    return res.redirect(req.header("Refer") || "/");
  }
}
