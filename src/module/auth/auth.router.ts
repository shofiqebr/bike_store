import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const authRouter = Router()

authRouter.post("/api/auth/register",validateRequest(UserValidation.userValidationSchema),AuthControllers.register)
authRouter.post('/api/auth/login', validateRequest(AuthValidation.loginValidationSchema), AuthControllers.login);
export default authRouter;