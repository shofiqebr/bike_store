import { USER_ROLE } from "./user.constrants";

export interface IUser {
    name: string
    email: string
    password: string
    role?: "customer" | "admin"
    
}

export type TUserRole = keyof typeof USER_ROLE;