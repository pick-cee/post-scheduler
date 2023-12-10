import dotenv from 'dotenv'
import connectDB from './config/database'
import app from './app'
import client from './config/redis'
dotenv.config()

const port = process.env.PORT

connectDB()
    .then(async () => {
        await client.connect().then(() => {
            console.log('Redis connected successfully')
        })
        app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        })
    })
    .catch((error) => {
        console.log("Database connection failed! \n", error);
    });