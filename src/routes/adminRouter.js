import { Router } from "express";
import {
  dashUsers,
  dashGrade,
  searchUser,
  dashGroup,
  dashTask,
  dashTopic,
  dashAnswer,
  dashTest,
  dashTestUpload,
} from "../contollers/adminController.js";
let router = Router();

// === USERS ===
router.route("/users").get(dashUsers);

router.route("/users/search").post(searchUser);

// === GROUPS ===
router.route("/groups").get(dashGroup);

// === GRADE ===
router.route("/groups/:groupId/").get(dashGrade);

// === TOPICS ===
router.route("/groups/:groupId/grade/:gradeId/").get(dashTopic);

// === TASKS ===
router.route("/groups/:groupId/grade/:gradeId/topic/:topicId").get(dashTask);

// === TESTS ===
router.route("/tests").get(dashTest);

router.route("/tests/:taskId").get(dashTestUpload);
// === ANSWERS ===
router
  .route("/groups/:groupId/grade/:gradeId/topic/:topicId/task/:taskId")
  .get(dashAnswer);

/* router.route("/:dashId") Redirects if path does not exists
  .get(dashboard) */

export default router;
