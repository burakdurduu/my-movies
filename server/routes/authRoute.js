import express from "express";
import {
  login,
  logout,
  signup,
  getMe,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controller/authController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
