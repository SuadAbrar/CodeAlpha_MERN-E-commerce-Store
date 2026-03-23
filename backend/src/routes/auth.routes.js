import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", authMiddleware, getProfile);

export default router;
