import Order from "./order.model";
import Product from "../product/product.model";
import { IRevenueResponse } from "../revenue/revenue.interface";
// import { IUser } from "../user/user.interface";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";

const createOrder = async (
  payload: { user: string; products: { product: string; quantity: number }[] }
) => {
  // Validate the payload
  if (!payload.products?.length) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Order must have products");
  }

  

  let totalPrice = 0;

  // Fetch product details and calculate total price
  const productDetails = await Promise.all(
    payload.products.map(async (item) => {
      const product = await Product.findById(item.product);

      if (!product) {
        throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
      }

        if (product.stock < item.quantity) {
          throw new AppError(
            StatusCodes.BAD_REQUEST,
            `Not enough stock for ${product.name}`
          );
        }
  
        product.stock -= item.quantity;
        await product.save(); // Save updated stock to DB
  

      const subtotal = product.price * item.quantity;
      totalPrice += subtotal;

      return {
        product: product._id,
        quantity: item.quantity,
      };
    })
  );

  const order = await Order.create({
    user: payload.user,
    products: productDetails,
    totalPrice,
  });

  return order;
}

const getAllOrders = async () => {
  const orders = await Order.find().populate("user", "email").populate("products.product");
  return orders;
};

const getOrderById = async (orderId: string) => {
  const order = await Order.findById(orderId)
    .populate("user", "email")
    .populate("products.product");

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }

  return order;
};

const updateOrderStatus = async (orderId: string, status: string) => {
  const validStatuses = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];

  if (!validStatuses.includes(status)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid order status");
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }

  return order;
};

const deleteOrder = async (orderId: string) => {
  const order = await Order.findByIdAndDelete(orderId);

  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }

  return { message: "Order deleted successfully" };
};





const calculateRevenue = async (): Promise<IRevenueResponse> => {
  const result = await Order.aggregate([
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "products",
        localField: "products.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $multiply: ["$products.quantity", "$productDetails.price"] },
        },
      },
    },
  ]);

  return {
    totalRevenue: result.length > 0 ? result[0].totalRevenue : 0,
  };
};

export const orderService = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  calculateRevenue,
};