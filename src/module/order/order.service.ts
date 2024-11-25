import Order from "./order.model";
import Product from "../product/product.model";
import { IRevenueResponse } from "../revenue/revenue.interface";

const createOrder = async (payload: { email: string; product: string; quantity: number; totalPrice: number }) => {
  const { email, product: productId, quantity, totalPrice } = payload;

  // Find the product by ID
  const product = await Product.findById(payload.product);

  if (!product) {
    throw new Error("Product not found");
  }

  // Check if there is enough stock
  if (product.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  // Create the order
  const order = await Order.create({
    email,
    product: productId,
    quantity,
    totalPrice,
  });

  // Update the product inventory
  product.quantity -= quantity;
  product.inStock = product.quantity > 0;
  await product.save();

  return order;
};

const calculateRevenue = async (): Promise<IRevenueResponse> => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    { $unwind: "$productDetails" },
    {
      $project: {
        totalRevenue: {
          $multiply: ["$quantity", "$productDetails.price"],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalRevenue" },
      },
    },
  ]);

  return {
    totalRevenue: result.length > 0 ? result[0].totalRevenue : 0,
  };
};

export const orderService = {
  createOrder,
  calculateRevenue
};
