import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './routes/auth'
import postRoutes from './routes/post'
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true, parameterLimit: 6000 }))
app.use(cors())
app.use(morgan('combined'))


app.get('/', (request, response) => {
    response.json({ message: 'Welcome to post scheduler' })
})

app.use('/api/v1', authRoutes)
app.use('/api/v1', postRoutes)

export default app