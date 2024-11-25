

// import { Router } from "express"
// import { orderController } from "./order.controller"

// const orderRouter = Router()

// orderRouter.post("/api/orders", orderController.createOrder)


// export default orderRouter


import { Router } from "express";
import { orderController } from "./order.controller";

const orderRouter = Router();

// POST route to create an order
orderRouter.post("/api/orders", orderController.createOrder);

orderRouter.get("/api/orders/revenue", orderController.getRevenue);
export default orderRouter;
