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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        // Delegate to service
        const order = yield order_service_1.orderService.createOrder(payload);
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
    getRevenue
};
