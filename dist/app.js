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
// Allow multiple origins dynamically
const allowedOrigins = [
    "https://bike-store-front.vercel.app",
    // "https://bike-store-blush.vercel.app",
    "http://localhost:5173"
];
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            // Allow requests from allowed origins
            callback(null, true);
        }
        else {
            // Reject requests from other origins
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow cookies with cross-origin requests
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(product_router_1.default);
app.use(order_router_1.default);
app.use(auth_router_1.default);
app.get('/', (req, res) => {
    res.send("Hello from bike store");
});
exports.default = app;
