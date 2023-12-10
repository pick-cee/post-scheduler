import bcryptjs from 'bcryptjs'

export const passwordHash = async (password: string) => {
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(password, salt)
    return hash
}

export const passwordCompare = async (hashPassword: string, password: string) => {
    const isMatch = await bcryptjs.compare(password, hashPassword)
    return isMatch
}
