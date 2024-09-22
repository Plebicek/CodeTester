import { createServer } from "http"
import RedisService from "./queue/index.js"
import config from "./config.js"
import logger from "codetester-logger"
import App from "./web/app.js"
import AppError from "codetester-error"

let redisService = undefined

async function main() {
    const server = createServer(App)
    logger.info("============= APP INIT ============")
    if (process.env.NODE_ENV === "development") {
        logger.warn("=============          ============")
        logger.warn("=============   DEV    ============")
        logger.warn("=============          ============")
        logger.warn("=============   RedisService CONNECTION     ============")
        if (!config.dev.redis.url) throw new AppError("DEV redis URL connection is not defined", 500, "set URL connection in config.js")
        redisService = new RedisService(config.dev.redis.url)
        await redisService.init()
        if (!config.dev.web.port) throw new AppError("DEV WEB port is not defined", 500, "set port number in config.js")
        server.listen(config.dev.web.port, () => {
            logger.info(`[WEB] LISTENNING PORT ${config.dev.web.port}`)
        })
    } else {
        logger.info("=============          ============")
        logger.info("=============   PROD   ============")
        logger.info("=============          ============")
        logger.warn("=============   RedisService CONNECTION     ============")
        if (!config.dev.redis.url) throw new AppError("Redis URL connection is not defined", 500, "set URL connection in config.js")
        redisService = new RedisService(config.prod.redis.url) //Todo: Load from config
        await redisService.init()
        if (!config.dev.prod.port) throw new AppError("WEB port is not defined", 500, "set port number in config.js")
        server.listen(config.prod.web.port, () => {
            logger.info(`[WEB] LISTENNING PORT ${config.prod.web.port}`)
        })
    }
}

export default redisService

main()