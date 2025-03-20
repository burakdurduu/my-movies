import express from "express";
import {
  login,
  logout,
  signup,
  checkAuth,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controller/authController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/check-auth", protectRoute, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
