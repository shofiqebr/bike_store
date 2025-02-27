"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constrants_1 = require("./user.constrants");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        email: zod_1.z.string().email({ message: "Invalid email format" }),
        role: zod_1.z
            .enum(Object.values(user_constrants_1.USER_ROLE))
            .default("customer")
            .optional(),
        phone: zod_1.z
            .string()
            // .regex(/^\d{3,15}$/, { message: "Phone number must be 3-15 digits" })
            .optional(),
        address: zod_1.z.string().max(100, { message: "Address cannot exceed 100 characters" }).optional(),
        city: zod_1.z.string().max(50, { message: "City cannot exceed 50 characters" }).optional(),
    }),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email({ message: "Invalid email format" }),
    }),
});
exports.UserValidation = {
    userValidationSchema,
    loginValidationSchema,
};
