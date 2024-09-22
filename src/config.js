import { join } from "path"
import { config } from "dotenv"
config({ path: join(process.cwd(), ".env") })

const devConfig = {
    redis: {
        url: process.env.REDIS_URL_DEV,
        bull: {
            processLimit: 1,
            maxDuration: 3000,
        }
    },
    web: {
        port: Number(process.env.PORT_DEV)
    }
}

const prodConfig = {
    redis: {
        url: process.env.REDIS_URL
    },
    web: {
        port: Number(process.env.PORT)
    }
}

class Config {
    constructor() {
        this.config = prodConfig
        if (process.env.NODE_ENV == "development") { this.config = devConfig }
    }

    init() {
        return this.config
    }
}

export default new Config().init()