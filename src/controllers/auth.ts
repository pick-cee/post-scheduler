import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}

import { NextFunction } from 'express'
import User from '../models/user'
import { passwordCompare } from '../utils/bcrypt'
import { jwtSign } from '../utils/jwtSign'
import client from '../config/redis'

export async function SignUp(
    request: express.Request,
    response: express.Response,
    next: NextFunction
) {
    const { name, email, password } = request.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        return response.status(409).json({
            message: 'Email already exists, please log in'
        })
    }
    if (!name && !email && !password) {
        return response.status(400).json({
            message: 'Please fill all required fields'
        })
    }
    const newUser = new User({
        name,
        email,
        password
    })
    const userNew = await newUser.save()
    return response.status(201).json({
        message: 'User created...',
        data: userNew
    })
}

export async function LogIn(
    request: express.Request,
    response: express.Response,
    next: NextFunction
) {
    const { email, password } = request.body
    if (!email && !password) {
        return response.status(400).json({
            message: "Please fill in the required fields"
        })
    }
    const userExists = await User.findOne({ email }).exec()
    if (!userExists) {
        return response.status(404).json({
            message: 'User not found'
        })
    }
    const comparePassword = await passwordCompare(userExists.password, password)
    if (!comparePassword) {
        return response.status(400).json({
            message: 'Incorrect password'
        })
    }
    const payload: any = {
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email
    }
    const token = await jwtSign(payload)
    return response.status(200).json({
        message: 'Logged in......',
        token: token
    })
}

export const LogOut = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
) => {
    try {
        const user = request.user
        if (!user) {
            // If no user is found in the request object, the user is not authenticated
            return response.status(401).json({ message: 'Unauthorized' });
        }
        await client.del('user')
        delete request.user
        return response.status(200).json({
            message: 'Log out successful'
        })
    }
    catch (error: any) {
        return response.status(500).json({
            message: 'Server error.... try again later',
            error: error.message
        })
    }
}