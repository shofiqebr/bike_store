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
exports.productController = void 0;
// import Product from './product.model';
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield product_service_1.productService.createProduct(payload);
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    }
    catch (error) {
        // Check if it's a validation error
        if (error.name === 'ValidationError') {
            res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    name: error.name,
                    errors: error.errors,
                },
            });
        }
        else {
            // Handle other unexpected errors
            res.status(500).json({
                message: 'An unexpected error occurred',
                success: false,
                error: error.message,
            });
        }
    }
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productService.getProduct();
        res.send({
            status: true,
            message: "Product getting successfully",
            result
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: "somthing went wrong",
            error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.productService.getSingleProduct(productId);
        res.send({
            status: true,
            message: "Product getting successfully",
            result
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: "somthing went wrong",
            error,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const body = req.body;
        const result = yield product_service_1.productService.updateProduct(productId, body);
        res.send({
            status: true,
            message: "Product updated successfully",
            result
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: "somthing went wrong",
            error,
        });
    }
});
const deletProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield product_service_1.productService.deletProduct(productId);
        res.send({
            status: true,
            message: "Product deleted successfully",
            result: {},
        });
    }
    catch (error) {
        res.json({
            status: false,
            message: "somthing went wrong",
            error,
        });
    }
});
exports.productController = {
    createProduct,
    getProduct,
    getSingleProduct,
    updateProduct,
    deletProduct
};
