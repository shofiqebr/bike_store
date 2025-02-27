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
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
