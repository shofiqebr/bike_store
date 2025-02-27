/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderService } from "./order.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

// const createOrder = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const payload = req.body;

//     // Delegate to service
//     const order = await orderService.createOrder(payload);

//     res.status(201).json({
//       message: "Order created successfully",
//       status: true,
//       data: order,
//     });
//   } catch (error: any) {
//     if (error.message === "Product not found") {
//       res.status(404).json({
//         message: error.message,
//         success: false,
//       });
//     } else if (error.message === "Insufficient stock") {
//       res.status(400).json({
//         message: error.message,
//         success: false,
//       });
//     } else {
//       res.status(500).json({
//         message: "An unexpected error occurred",
//         success: false,
//         error: error.message,
//       });
//     }
//   }
// };

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;

    const order = await orderService.createOrder( payload, req.ip!);

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

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Order verified successfully",
    data: order,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.getOrderById(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: "Order details retrieved",
    data: order,
  });              
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: "Order status updated",
    data: order,
  }); 
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderService.deleteOrder(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: true,
    message: 'Order Deleted Successfully',
    data: result.message
  });
});
 


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
  verifyPayment,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getRevenue
};
