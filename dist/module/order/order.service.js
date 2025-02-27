"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
// import { IUser } from "../user/user.interface";
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_utils_1 = require("./order.utils");
const createOrder = (payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Validate the payload
    if (!((_a = payload.products) === null || _a === void 0 ? void 0 : _a.length)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Order must have products");
    }
    const user = yield user_model_1.default.findById(payload.user);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    let totalPrice = 0;
    // Fetch product details and calculate total price
    const productDetails = yield Promise.all(payload.products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield product_model_1.default.findById(item.product);
        if (!product) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Product not found");
        }
        if (product.stock < item.quantity) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `Not enough stock for ${product.name}`);
        }
        product.stock -= item.quantity;
        yield product.save(); // Save updated stock to DB
        const subtotal = product.price * item.quantity;
        totalPrice += subtotal;
        return {
            product: product._id,
            quantity: item.quantity,
        };
    })));
    const order = yield order_model_1.default.create({
        user: payload.user,
        products: productDetails,
        totalPrice,
    });
    // console.log(user)
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: user.name || '',
        customer_address: user.address || '',
        customer_email: user.email || '',
        customer_phone: user.phone || '',
        customer_city: user.city || '',
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    return { order, payment };
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            "transaction.id": order_id,
        }, {
            "transaction.bank_status": verifiedPayment[0].bank_status,
            "transaction.sp_code": verifiedPayment[0].sp_code,
            "transaction.sp_message": verifiedPayment[0].sp_message,
            "transaction.transactionStatus": verifiedPayment[0].transaction_status,
            "transaction.method": verifiedPayment[0].method,
            "transaction.date_time": verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == "Success"
                ? "Paid"
                : verifiedPayment[0].bank_status == "Failed"
                    ? "Pending"
                    : verifiedPayment[0].bank_status == "Cancel"
                        ? "Cancelled"
                        : "",
        });
    }
    return verifiedPayment;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.default.find().populate("user", "email").populate("products.product");
    return orders;
});
const getOrderById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findById(orderId)
        .populate("user", "email")
        .populate("products.product");
    if (!order) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Order not found");
    }
    return order;
});
const updateOrderStatus = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const validStatuses = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];
    if (!validStatuses.includes(status)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Invalid order status");
    }
    const order = yield order_model_1.default.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Order not found");
    }
    return order;
});
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findByIdAndDelete(orderId);
    if (!order) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Order not found");
    }
    return { message: "Order deleted successfully" };
});
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.aggregate([
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
});
exports.orderService = {
    createOrder,
    verifyPayment,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    calculateRevenue,
};
