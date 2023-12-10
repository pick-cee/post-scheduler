import dotenv from 'dotenv'
import connectDB from './config/database'
import app from './app'
dotenv.config()

const port = process.env.PORT

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        })
    })
    .catch((error) => {
        console.log("Database connection failed! \n", error);
    });