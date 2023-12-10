import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import { readdirSync } from 'fs'
import path from 'path'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true, parameterLimit: 6000 }))
app.use(cors())
app.use(morgan('combined'))


app.get('/', (request, response) => {
    response.json({ message: 'Welcome to post scheduler' })
})


export default app