import { config } from "dotenv"
config({ path: "../.env" })

export const devConfig = {
    redis: {
        url: process.env.REDIS_URL_DEV
    },
    web: {
        port: Number(process.env.PORT_DEV)
    }
}

export const prodConfig = {
    redis: {
        url: process.env.REDIS_URL
    },
    web: {
        port: Number(process.env.PORT)
    }
}