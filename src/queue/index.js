import { createClient } from "redis"
import Bull from "bull"
/* export default class QueueService {
    constructor(url) {
        if (!url) throw new Error("RedisService parameter URL is not specified")
        try {
            this.client = createClient({ url, socket: { keepAlive: true }, pingInterval: 5000 })
        } catch (err) {
            logger.error(`RedisService connection error: ${err.message}`)
            throw err.message
        }
        this.client.on("error", this.#onError)
    }

    async init() {
        try {
            await this.client.connect()
            logger.info("=============     RedisService CONNECTED    ============")
        } catch (err) {
            logger.error(`RedisService connection error: ${err.message}`)
            throw err.message
        }
    }

    getClient() {
        return this.client
    }

    #onError(err) {
        logger.error(`RedisService ran into unexpected error: ${err.message}`)
        throw new Error()
    }
}
 */

class QueueService {
    constructor(config) {
        this.queue
        this.config = config
        this.client
    }

    async _init() {
        this.client = createClient({ url: this.config.url, socket: { keepAlive: true } })
        await this.client.connect()
        this.queue = new Bull("task", this.config.url, { limiter: { max: this.config.bull.processLimit, duration: this.config.bull.maxDuration } })

    }


}