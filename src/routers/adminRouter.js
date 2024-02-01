import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminController from "../controllers/adminController.js";

const router = express.Router();

// Allocate role/manager to user
router.patch(
  "/allocate/:id",
  authMiddleware.ensureLogin,
  authMiddleware.ensureAdmin,
  adminController.allocate
);

// Deallocate role/manager to user
router.patch(
  "/deallocate/:id",
  authMiddleware.ensureLogin,
  authMiddleware.ensureAdmin,
  adminController.deallocate
);

export default router;
