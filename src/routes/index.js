
import { Router } from "express";
import morgan from "morgan"
import userRouter from "./userRouter.js";
import indexRouter from "./indexRouter.js";
import gradeRouter from "./gradeRouter.js";
import taskRouter from "./taskRouter.js";
import jwtAuth, { isAdmin } from "../middlewares/jwtAuth.js";
import adminRouter from "./adminRouter.js";

const logger = morgan("tiny")

const router = Router();

router.use(logger)

router.use("/", userRouter);
router.use("/", jwtAuth);
router.use("/", indexRouter);
router.use("/", gradeRouter);

router.use("/grade/:gradeId/",taskRouter);
router.use("/admin/dashboard/", isAdmin, adminRouter);

router.use(function (req, res) {
  res.redirect("/")
});

export default router;
