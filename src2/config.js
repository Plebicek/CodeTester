import { config } from "dotenv"
config({ path: "../.env" })

export default {
    dev: {
        redis: {
            url: process.env.REDIS_URL_DEV
        },
        web: {
            port: Number(process.env.PORT_DEV)
        }
    },
    prod: {
        redis: {
            url: process.env.REDIS_URL
        },
        web: {
            port: Number(process.env.PORT)
        }
    }
}