import { Router } from "express";

let router = Router();

router.route("/").get(function (req, res) {
  res.send("hihi");
});

export default router;
