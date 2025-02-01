"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'Please provide your name'] },
    brand: { type: String, required: [true, 'Please provide brand name'] },
    price: { type: Number, required: true, min: [0, "Price must be a positive number"] },
    category: { type: String, enum: { values: ['Mountain', 'Road', 'Hybrid', 'Electric'], message: '{VALUE} is not available' }, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
}, { timestamps: true });
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
