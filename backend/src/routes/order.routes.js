import express from "express";

import {
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../controllers/order.controller.js";

import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getOrders);
router.get("/all", authMiddleware, adminMiddleware, getAllOrders);
router.put(
  "/status/:orderId",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus,
);
router.put(
  "/payment/:orderId",
  authMiddleware,
  adminMiddleware,
  updatePaymentStatus,
);

export default router;
