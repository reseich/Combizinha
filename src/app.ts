import express from 'express'
import {router} from "./router";
import morgan from 'morgan'
import mongoose from "mongoose";

const app = express()

mongoose.connect('mongodb://localhost:27017/Combizinha', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Database connected')
});

app.use(morgan('dev'))
app.use(express.json())
app.use(router)
export {app}
