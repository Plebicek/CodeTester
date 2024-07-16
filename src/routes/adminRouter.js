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
  deleteUserAnswer,
} from "../contollers/adminController.js";
import upload from "../helper/test_upload.js";

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

router.route("/tests/:taskId")
  .get(dashTestUpload)
  .post(upload,dashTestUpload); 

  // === ANSWERS ===
router
  .route("/groups/:groupId/grade/:gradeId/topic/:topicId/task/:taskId")
  .get(dashAnswer);

router
  .route("/groups/:groupId/grade/:gradeId/topic/:topicId/task/:taskId/delete-answer")
  .post(deleteUserAnswer);

export default router;
