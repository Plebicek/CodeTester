import { createServer } from "http"
import Config from "./config.js"
import WebService from "./web/app.js"


async function main() {


    const web = new WebService(Config.web)
    const server = createServer(web.getApp())
    server.listen(Config.web.port)


    /* const server = createServer(App)
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
    } */
}

/* export default redisService */

main()