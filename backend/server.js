import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js"
import router from './routes/goalRoute.js'
import {errorHandler} from "./middleware/errorMiddleware.js"
const PORT = process.env.PORT || 8000;

dotenv.config();

connectDB();

const app = express();

// handles post requests
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', router)


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`app runing on port ${PORT}`)
})

