const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const errorHandler = require('./utils/errorHandler')
const unknownEndpoint = require('./utils/unknownEndpoint')
const routes = require('./routes/routes')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.use(express.static('build')) //serving static content
app.use(cors())
app.use(express.json()) //body

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :response-time ms - :res[content-length] byte :body - :req[content-length] byte'))

routes(app)

app.use(errorHandler)
app.use(unknownEndpoint)

logger.info('connecting to', config.DB_URL)

mongoose
    .connect(config.DB_URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => logger.info('connected to MongoDB'))
    .catch(err => logger.info('error connecting to MongoDB:', err.message))

module.exports = app