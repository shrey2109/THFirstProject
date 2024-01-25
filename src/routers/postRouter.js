import express from "express";
import postController from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// create a post
router.post(
  "/createPost",
  authMiddleware.ensureLogin,
  postController.create
);

// get all posts
router.get("/posts", postController.allPosts);

// get a particular post
router.get("/post/:id", postController.getPost);

// update a post
router.put("/post/:id", authMiddleware.ensureLogin, postController.update);

// delete a post
router.delete(
  "/post/:id",
  authMiddleware.ensureLogin,
  postController.remove
);

export default router;
