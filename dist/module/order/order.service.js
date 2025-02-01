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
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, product: productId, quantity, totalPrice } = payload;
    // Find the product by ID
    const product = yield product_model_1.default.findById(payload.product);
    if (!product) {
        throw new Error("Product not found");
    }
    // Check if there is enough stock
    if (product.quantity < quantity) {
        throw new Error("Insufficient stock");
    }
    // Create the order
    const order = yield order_model_1.default.create({
        email,
        product: productId,
        quantity,
        totalPrice,
    });
    // Update the product inventory
    product.quantity -= quantity;
    product.inStock = product.quantity > 0;
    yield product.save();
    return order;
});
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.aggregate([
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
});
exports.orderService = {
    createOrder,
    calculateRevenue
};
