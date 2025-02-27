"use strict";
// import { Router } from "express"
// import { orderController } from "./order.controller"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const orderRouter = Router()
// orderRouter.post("/api/orders", orderController.createOrder)
// export default orderRouter
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constrants_1 = require("../user/user.constrants");
const orderRouter = (0, express_1.Router)();
// POST route to create an order
orderRouter.post("/api/orders", (0, auth_1.default)(user_constrants_1.USER_ROLE.customer), order_controller_1.orderController.createOrder);
orderRouter.get("/api/orders", (0, auth_1.default)(user_constrants_1.USER_ROLE.customer), order_controller_1.orderController.getAllOrders);
orderRouter.get("/api/orders/:id", (0, auth_1.default)(user_constrants_1.USER_ROLE.customer), order_controller_1.orderController.getOrderById);
orderRouter.patch("/api/orders/:id/status", (0, auth_1.default)(user_constrants_1.USER_ROLE.customer), order_controller_1.orderController.updateOrderStatus);
orderRouter.delete("/api/orders/:id", (0, auth_1.default)(user_constrants_1.USER_ROLE.customer), order_controller_1.orderController.deleteOrder);
orderRouter.get("/api/verify", (0, auth_1.default)(user_constrants_1.USER_ROLE.customer), order_controller_1.orderController.verifyPayment);
orderRouter.get("/api/orders/revenue", order_controller_1.orderController.getRevenue);
exports.default = orderRouter;
