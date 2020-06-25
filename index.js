// for environment variables
require('dotenv').config()

const PORT = process.env.PORT || 3001

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const errorHandler = require('./middleware/errorHandler')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const routes = require('./routes')

app.use(express.static('build')) //serving static content
app.use(cors())
app.use(express.json()) //body

morgan.token('body', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :response-time ms - :res[content-length] byte :body - :req[content-length] byte'))

routes(app)

app.use(errorHandler)
app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})