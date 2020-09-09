import express from 'express'
import {router} from "./router";
import morgan from 'morgan'
import mongoose from "mongoose";
import {Logger} from "tslog";
import cors from 'cors'
const log: Logger = new Logger();

const app = express()

mongoose.connect('mongodb://localhost:27017/Combizinha', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    log.debug('Database connected')
});

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(router)
export {app}
