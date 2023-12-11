import jwt from 'jsonwebtoken'

export const jwtSign = async (payload: any) => {
    return jwt.sign(payload, `${process.env.JWT_ACCESS_KEY}`, { expiresIn: '24h' })
}