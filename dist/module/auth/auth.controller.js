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
exports.AuthControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_codes_1 = require("http-status-codes");
const register = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.register(req.body);
    (0, sendResponse_1.default)(res, {
        status: true,
        message: "User rgistered successfully",
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        data: {
            _id: result._id,
            name: result.name,
            email: result.email,
            role: result.role
        }
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.getAllUsers();
    (0, sendResponse_1.default)(res, {
        status: true,
        message: "Users fetched successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: result,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.AuthService.login(req.body);
    // const tokenWithBearer = `Bearer ${result?.token}`;
    // Store token in an HTTP-only cookie
    res.cookie("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.ACCEPTED,
        status: true,
        message: "User logged in successfully",
        data: { token: result === null || result === void 0 ? void 0 : result.token }
    });
}));
const logout = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    (0, sendResponse_1.default)(res, {
        status: true,
        message: "User logged out successfully",
        statusCode: http_status_codes_1.StatusCodes.OK,
        data: {}
    });
}));
exports.AuthControllers = {
    register,
    getAllUsers,
    login,
    logout
};
