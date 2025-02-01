"use strict";
// import { Router } from "express"
// import { orderController } from "./order.controller"
Object.defineProperty(exports, "__esModule", { value: true });
// const orderRouter = Router()
// orderRouter.post("/api/orders", orderController.createOrder)
// export default orderRouter
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const orderRouter = (0, express_1.Router)();
// POST route to create an order
orderRouter.post("/api/orders", order_controller_1.orderController.createOrder);
orderRouter.get("/api/orders/revenue", order_controller_1.orderController.getRevenue);
exports.default = orderRouter;
