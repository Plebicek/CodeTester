import { ErrorMessage } from "../utils/errorHandler.js";
import { Router } from "express";
import morgan from "morgan"
import errorMiddleware from "../utils/errorHandler.js";
import userRouter from "./userRouter.js";
import indexRouter from "./indexRouter.js";
import gradeRouter from "./gradeRouter.js";
import taskRouter from "./taskRouter.js";
import jwtAuth, { isAdmin } from "../middlewares/jwtAuth.js";
import adminRouter from "./adminRouter.js";
import sysRouter from "./systemRoute.js";

const logger = morgan("tiny")

const router = Router();

router.use(logger)
router.use("/sys/",sysRouter)
router.use((req,res,next)=>{req.locals = {};next()})

router.use("/", userRouter);
router.use("/", jwtAuth);
router.use("/", indexRouter);
router.use("/", gradeRouter);

router.use("/grade/:gradeId/",taskRouter);
router.use("/admin/dashboard/", isAdmin, adminRouter);

router.use(function (req, res,next) {
  next(new ErrorMessage("page not found", 404))
});

router.use(errorMiddleware)

export default router;
