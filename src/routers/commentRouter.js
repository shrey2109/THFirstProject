import express from "express";
import commentController from "../controllers/commentController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// create a Comment
router.post(
  "/:postId/createComment",
  authMiddleware.ensureLogin,
  commentController.create
);

// get all Comments
router.get("/comments", commentController.allComments);

// get a particular Comment
router.get("/comment/:commentId", commentController.getComment);

// update a Comment
router.put(
  "/comment/:commentId",
  authMiddleware.ensureLogin,
  commentController.update
);

// delete a Comment
router.delete(
  "/comment/:commentId",
  authMiddleware.ensureLogin,
  commentController.remove
);

export default router;
