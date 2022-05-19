const logger = require("./logger")

const requestLogger = (request, response, next) => {
    logger.info("Method:", request.method)
    logger.info("Path:  ", request.path)
    logger.info("Body:  ", request.body)
    logger.info("---")
    next()
}

const unknownRequest = (request, response) => {
    response.status(404).send({ error: "unknown request" })
}

const errorHandler = (error, req, res, next) => {
    switch (error.name) {
    case "CastError": return res.status(400).send({ error: error.message })
    case "ValidationError": return res.status(400).json({ error: error.message })
    case "JsonWebTokerError": return res.status(401).js({error: "invalid token"})
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownRequest,
    errorHandler
}