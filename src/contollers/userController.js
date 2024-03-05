import jwt from "jsonwebtoken";
import { getUserByName, createUser } from "../models/user.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config({ path: "../.env" });

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
          { id: isUser.user_id },
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
  res.send("Logged out");
}

export function viewLogin(req, res) {
  res.render("auth/login");
}
