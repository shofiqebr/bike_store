"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const productRouter = (0, express_1.Router)();
productRouter.post('/create-product', product_controller_1.productController.createProduct);
exports.default = productRouter;
