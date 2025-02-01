import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../app/config";
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser>({
    name : {type : String , required: true},
    email : {type : String , required: true, unique: true},
    password: {type : String , required: true},
    role : {type: String, enum: [ "customer", "admin"], default: "customer"}
})

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;

    // Check if the password is being modified
    if (!user.isModified('password')) {
        return next();
    }

    // Ensure password is present
    if (!user.password) {
        throw new Error('Password is required for hashing.');
    }

    // Ensure bcrypt salt rounds are set properly
    const saltRounds = Number(config.bcrypt_salt_rounds);
    if (isNaN(saltRounds) || saltRounds <= 0) {
        throw new Error('Invalid bcrypt salt rounds configuration.');
    }

    // Hash the password
    user.password = await bcrypt.hash(user.password, saltRounds);

    next();
});

userSchema.post('save', function(doc, next){
    doc.password = '';
    next();
})

const User = model<IUser>("User", userSchema)
export default User