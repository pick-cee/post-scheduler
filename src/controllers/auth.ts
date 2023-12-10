import express, { NextFunction } from 'express'
import User from '../models/user'

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