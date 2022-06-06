import express from "express";
import dotenv from "dotenv";
import router from './routes/goalRoute.js'
import {errorHandler} from "./middleware/errorMiddleware.js"
const PORT = process.env.PORT || 8000;


dotenv.config();

const app = express();

// handles post requests
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', router)


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`app runing on port ${PORT}`)
})

