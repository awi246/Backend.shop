import express from 'express'
import cors from 'cors'
import routes from '../routes'
import * as ErrorMiddlewares from '../middlewares/errors.middleware'

const app = express()
app.use(cors())
// to prevent from undefined req body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', routes)
app.use(ErrorMiddlewares.methodNotAllowed)
app.use(ErrorMiddlewares.genericErrorHandler)

export default app
