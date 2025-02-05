import { Types } from "mongoose";

export interface IOrder {
  user: Types.ObjectId;
  // email: string;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
