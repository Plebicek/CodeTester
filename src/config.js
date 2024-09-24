import { join } from "path"
import { config } from "dotenv"
config({ path: join(process.cwd(), `/.env.${process.env.NODE_ENV}`) })

const appConfig = {
    redis: {
        url: process.env.REDIS_URL,
        bull: {
            processLimit: 1,
            maxDuration: 3000,
        }
    },
    web: {
        port: Number(process.env.WEB_PORT)
    },

}


class Config {
    constructor() {
        this.config = appConfig
        console.log(process.env.NODE_ENV)
    }

    init() {
        return this.config
    }
}

export default new Config().init()