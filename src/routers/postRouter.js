import express from "express";
import postController from "../controllers/postController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// create a post
router.post("/", authMiddleware.ensureLogin, postController.create);

// get all posts
router.get("/", postController.allPosts);

// get a particular post
router.get("/:id", postController.getPost);

// update a post
router.patch("/:id", authMiddleware.ensureLogin, postController.update);

// delete a post
router.delete("/:id", authMiddleware.ensureLogin, postController.remove);

export default router;
