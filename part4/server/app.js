const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const config = require("./utils/config")
const blogsRouter = require("./controllers/blogs")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
require("express-async-errors")

mongoose.connect(config.MONGOURL)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((error) => {
        logger.error("error while connecting to MongoDB:", error)
    })

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownRequest)
app.use(middleware.errorHandler)

module.exports = app