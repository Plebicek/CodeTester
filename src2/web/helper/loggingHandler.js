import logger from "codetester-logger"

export default function loggerHandler(req, res, next) {
    logger.info(`${req.ip} [${req.method}] - URL: [${req.url}] `)

    res.on("finish", () => {
        logger.info(`${req.ip} [Response] - [${req.method}] - URL [${req.url}] - STATUS: [${res.statusCode}]`)
    })

    next()
}