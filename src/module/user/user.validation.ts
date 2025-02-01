import { z } from "zod";

const userValidationSchema = z.object({
body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string({
        required_error: "Password is required for your safety"
    }).max(20, {message: "Password can not be more than 20 characters"}),

})
});

export const UserValidation = {
    userValidationSchema
}
