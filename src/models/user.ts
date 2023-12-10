import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from "../interfaces/user";
import { passwordHash } from '../utils/bcrypt'

export interface IUserDocument extends IUser, Document { }

const userSchema = new Schema<IUserDocument>({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: [true, 'Password is required'],
        type: String
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    const user = this as IUserDocument

    //hash the password only if it has been modified or new
    if (!user.isModified('password')) {
        return next()
    }
    try {
        const hashPassword = await passwordHash(user.password)
        user.password = hashPassword
        next()
    }
    catch (error: any) {
        return next(error)
    }
})

const User = mongoose.model<IUserDocument>('User', userSchema)

export default User