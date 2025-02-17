

// import { Router } from "express"
// import { orderController } from "./order.controller"

// const orderRouter = Router()

// orderRouter.post("/api/orders", orderController.createOrder)


// export default orderRouter


import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constrants";

const orderRouter = Router();

// POST route to create an order
orderRouter.post("/api/orders",auth(USER_ROLE.customer), orderController.createOrder);

orderRouter.get("/api/orders/revenue", orderController.getRevenue);
export default orderRouter;
