const express = require("express");
const {
  allUserInfoController,
  registerController,
  loginController,
} = require("../controllers/authController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/all-users", requireSignIn, allUserInfoController);

module.exports = router;
