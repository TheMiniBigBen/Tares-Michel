// src/routes/order.routes.ts
import { Router } from "express";
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../controllers/order.controller";

const router = Router();

router.get("/orders", getAllOrders);
router.get("/orders/:orderId", getOrderById);
router.post("/orders", createOrder);
router.patch("/orders/:orderId", updateOrder);
router.delete("/orders/:orderId", deleteOrder);

export default router;
