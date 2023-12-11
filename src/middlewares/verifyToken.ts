import express, { NextFunction } from 'express'
import client from '../config/redis'
import jwt from 'jsonwebtoken'
import User from '../models/user'

const verifyToken = async (
    request: express.Request,
    response: express.Response,
    next: NextFunction
) => {
    if (
        request.headers.authorization &&
        request.headers.authorization.startsWith("Bearer")
    ) {
        try {
            const token = request.headers.authorization.split(" ")[1]
            jwt.verify(token, `${process.env.JWT_ACCESS_KEY}`, async (err: any, user: any) => {
                if (err) return next(console.log(err))
                const userExists = await User.findById(user._id).exec()
                if (userExists) {
                    request.user = user
                    client.setEx('user', 86400, JSON.stringify(user))
                    next()
                }
                else {
                    return response.status(401).json({
                        message: 'User not found, please sign up!'
                    })
                }
            })
        }
        catch (err: any) {
            return response.status(500).json({
                message: 'Server error, please try again later',
                error: err.message
            })
        }
    }
    else {
        return response.status(401).json({
            message: 'You are not authenticated!'
        })
    }
}


export default verifyToken