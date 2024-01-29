import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminController from "../controllers/adminController.js";

const router = express.Router();

// Update user role
router.patch(
  "/addSuperUser/:id",
  authMiddleware.ensureLogin,
  authMiddleware.ensureAdmin,
  adminController.addSuperUser
);

router.patch(
  "/removeSuperUser/:id",
  authMiddleware.ensureLogin,
  authMiddleware.ensureAdmin,
  adminController.removeSuperUser
);

// Allocate manager to a user
router.patch(
  "/allocateManager/:userId/:managerId",
  authMiddleware.ensureLogin,
  authMiddleware.ensureAdmin,
  adminController.allocateManager
);

// Deallocate manager from user
router.patch(
  "/deallocateManager/:userId",
  authMiddleware.ensureLogin,
  authMiddleware.ensureAdmin,
  adminController.deallocateManager
);

export default router;
