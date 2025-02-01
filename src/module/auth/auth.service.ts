import { IUser } from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const register = async( payload: IUser) => {
    const result = await User.create(payload)
    return result
}

const login = async (payload: {email: string; password: string}) =>{
    const user = await User.findOne({email: payload?.email}).select("+password")
    if (!user){
        throw new Error("This user is not found !")
    }
    
    // const isBlocked = user?.isBlocked
    
    // if(isBlocked) {
    //     throw new Error("This user is blocked !!")
    // }
    
    const isPasswordMatched = await bcrypt.compare(
        payload?.password,
        user?.password
    )

    if(!isPasswordMatched){
        throw new Error ('Wrong password!!!')
    }

    const jwtPayload = {
        email: user?.email,
        role: user?.role,
    }

    const token = jwt.sign(jwtPayload, "secret", { expiresIn: '15d' });

    return {token, user};

}

export const AuthService = {
    register,
    login
}