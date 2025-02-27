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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
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
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const order = yield order_service_1.orderService.createOrder(payload, req.ip);
        res.status(201).json({
            message: "Order created successfully",
            status: true,
            data: order,
        });
    }
    catch (error) {
        if (error.message === "Product not found") {
            res.status(404).json({
                message: error.message,
                success: false,
            });
        }
        else if (error.message === "Insufficient stock") {
            res.status(400).json({
                message: error.message,
                success: false,
            });
        }
        else {
            res.status(500).json({
                message: "An unexpected error occurred",
                success: false,
                error: error.message,
            });
        }
    }
});
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Order verified successfully",
        data: order,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_service_1.orderService.getAllOrders();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: "Orders retrieved successfully",
        data: orders,
    });
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.getOrderById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: "Order details retrieved",
        data: order,
    });
}));
const updateOrderStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.updateOrderStatus(req.params.id, req.body.status);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: "Order status updated",
        data: order,
    });
}));
const deleteOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.orderService.deleteOrder(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        status: true,
        message: 'Order Deleted Successfully',
        data: result.message
    });
}));
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = yield order_service_1.orderService.calculateRevenue();
        res.status(200).json({
            message: "Revenue calculated successfully",
            status: true,
            data: revenue,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "An unexpected error occurred",
            status: false,
            error: error.message,
        });
    }
});
exports.orderController = {
    createOrder,
    verifyPayment,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    getRevenue
};
