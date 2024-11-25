import { Request, Response } from "express";
import Order from "./order.model";  // Your Order model
import Product from "../product/product.model";  // Your Product model

const getRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    // Aggregation pipeline
    const result = await Order.aggregate([
      {
        $lookup: {
          from: "products", // Name of the collection for products
          localField: "product", // Field in the order collection to match
          foreignField: "_id", // Field in the product collection to match
          as: "productDetails" // The alias for the matched product details
        }
      },
      {
        $unwind: "$productDetails" // Deconstruct the productDetails array
      },
      {
        $project: {
          totalRevenue: {
            $multiply: ["$quantity", "$productDetails.price"] // Multiply quantity by product price
          }
        }
      },
      {
        $group: {
          _id: null, // No specific grouping, we want to calculate total
          totalRevenue: { $sum: "$totalRevenue" } // Sum of all revenue
        }
      }
    ]);

    // Check if we got results
    if (result.length === 0) {
      return res.status(200).json({
        message: "No orders found",
        status: true,
        data: { totalRevenue: 0 },
      });
    }

    // Send the total revenue response
    res.status(200).json({
      message: "Revenue calculated successfully",
      status: true,
      data: {
        totalRevenue: result[0].totalRevenue, // Extract total revenue from the aggregation result
      },
    });
  } catch (error: any) {
    console.error(error); // Log error if something goes wrong
    res.status(500).json({
      message: "An unexpected error occurred",
      status: false,
      error: error.message,
    });
  }
};

export const orderController = {
  getRevenue,
};









import { Router } from "express";
import { orderController } from "./order.controller";  // Import controller

const orderRouter = Router();

// GET route to calculate revenue
orderRouter.get("/api/orders/revenue", orderController.getRevenue);

export default orderRouter;
