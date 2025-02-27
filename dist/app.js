"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_router_1 = __importDefault(require("./module/product/product.router"));
const order_router_1 = __importDefault(require("./module/order/order.router"));
const auth_router_1 = __importDefault(require("./module/auth/auth.router"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// const port = 3000;
// parser
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow credentials (cookies)
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(product_router_1.default);
app.use(order_router_1.default);
app.use(auth_router_1.default);
app.get('/', (req, res) => {
    // const a = 10;
    res.send("Hellow");
});
exports.default = app;
