import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import * as env from 'dotenv'
import config from 'config'
import { routes } from './routes/routes';

const app = express()

env.config({path: __dirname+'/.env'})

app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT: string | number = process.env.PORT || 5000

mongoose.connect(config.get<string>('dbUrl'))
    .then(() => app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`)
        routes(app)
    })).catch(e => console.log(e))

