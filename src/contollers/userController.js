import jwt from "jsonwebtoken";
import { getUserByName, createUser, findUserByOAuth } from "../models/user.js";
import { createUserByOAuth as user } from "../models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ path: "../.env" });

export async function createOrFindByOAuth(req, res) {
  let { id, displayName } = req.user;
  let { mail, jobTitle } = req.user._json;
  if (req.isAuthenticated()) {
    let isUser = await findUserByOAuth(id);
    if (isUser) {
      let jwt_token = jwt.sign(
        { id: isUser.user_id, role: isUser.user_role },
        process.env.JWT_TOKEN,
        { expiresIn: "1h" }
      );
      res.cookie("auth", jwt_token, { httpOnly: true, maxAge: 3600000 });
    } else {
      let createUser = await user({
        user_oauth: id,
        user_email: mail,
        user_name: displayName,
        user_job_title: jobTitle,
      });
      if (typeof createUser == Error) {
        console.log("while creating user in oauth error occured");
        return res.redirect("/login/oauth");
      }
      let checkGroup = await checkGroup(createUser.user_id, jobTitle);
      if (!checkGroup) {
        console.log("err createing group" + checkGroup);
      }
      let jwt_token = jwt.sign(
        { id: createUser.user_id, role: createUser.user_role },
        process.env.JWT_TOKEN,
        { expiresIn: "1h" }
      );
      res.cookie("auth", jwt_token, { httpOnly: true, maxAge: 3600000 });
    }
    return res.redirect("/");
  }
  res.redirect("/login/oauth");
}

export async function registerUser(req, res) {
  if (req.cookies.auth) {
    return res.redirect("/");
  }
  if (req.method == "GET") {
    return res.render("auth/register");
  }
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const isCreated = await createUser(username, hash);
    if (isCreated) {
      return res.status(200).json("User was created");
    } else {
      return res.status(301).json("Failed to create user");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json("Internal server error");
  }
}

export async function loginUser(req, res) {
  try {
    if (req.cookies.auth) {
      return res.redirect("/");
    }
    if (req.method == "GET") {
      return res.render("auth/login");
    }
    if (!process.env.JWT_TOKEN) {
      throw new Error("jwt_token is not assined");
    }
    const { username, password } = req.body;
    const isUser = await getUserByName(username);
    if (isUser) {
      const isSame = await bcrypt.compare(password, isUser.user_hash);
      if (isSame) {
        let jwt_token = jwt.sign(
          { id: isUser.user_id, role: isUser.user_role },
          process.env.JWT_TOKEN,
          { expiresIn: "1h" }
        );
        res.cookie("auth", jwt_token, { httpOnly: true, maxAge: 7200000 });
        return res.redirect("/");
      }
    }
    res.status(301).json("wrong credentials");
  } catch (err) {
    console.log(err);
    res.status(500).json("internal Server error");
  }
}

export async function logoutUser(req, res) {
  res.clearCookie("auth");
  res.redirect("/");
}

export function viewLogin(req, res) {
  res.render("auth/login");
}
