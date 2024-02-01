import express from "express";
import commentController from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// create a Comment
router.post(
  "/:postId",
  authMiddleware.ensureLogin,
  commentController.create
);

// get all Comments
router.get("/", commentController.allComments);

// get a particular Comment
router.get("/:commentId", commentController.getComment);

// update a Comment
router.patch(
  "/:commentId",
  authMiddleware.ensureLogin,
  commentController.update
);

// delete a Comment
router.delete(
  "/:commentId",
  authMiddleware.ensureLogin,
  commentController.remove
);

export default router;
