import { Request, Response } from "express";
import { orderService } from "./order.service";

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;

    // Delegate to service
    const order = await orderService.createOrder(payload);

    res.status(201).json({
      message: "Order created successfully",
      status: true,
      data: order,
    });
  } catch (error: any) {
    if (error.message === "Product not found") {
      res.status(404).json({
        message: error.message,
        success: false,
      });
    } else if (error.message === "Insufficient stock") {
      res.status(400).json({
        message: error.message,
        success: false,
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred",
        success: false,
        error: error.message,
      });
    }
  }
};

const getRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const revenue = await orderService.calculateRevenue();

    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: revenue,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "An unexpected error occurred",
      status: false,
      error: error.message,
    });
  }
};

export const orderController = {
  createOrder,
  getRevenue
};
