"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        // name: z.string({
        //   required_error: "Name must be provided "
        // }),
        email: zod_1.z.string({
            required_error: "Email must be provided",
        }).email(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
};
