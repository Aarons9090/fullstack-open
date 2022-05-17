const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require("./utils/config")
const blogsRouter = require('./controllers/blogs')
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")

console.log(config.MONGOURL)
mongoose.connect(config.MONGOURL)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownRequest)
app.use(middleware.errorHandler)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})