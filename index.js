import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import router from './route/router.js'
import { corsOptions } from './middleware/coreOption.js'
import errorhandler from './middleware/errorhandler.js'
dotenv.config({ path: '.env' })
const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
const port = process.env.PORT
app.use(errorhandler)
app.listen(port, () => console.log(`port listening on http://localhost:${port}`))