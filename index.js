const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})