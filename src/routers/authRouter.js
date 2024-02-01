import express from "express";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get(
  "/users",
  authMiddleware.ensureLogin,
  authMiddleware.ensureAdmin,
  authController.allUserInfo
);

router.get("/user/:id", authMiddleware.ensureLogin, authController.userInfo);

export default router;
