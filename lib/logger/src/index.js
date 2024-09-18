import winston, { format, transports } from "winston"
const { printf, combine, timestamp, colorize } = format

const myFormat = printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`
})

export default winston.createLogger({
    info: "http",
    format: combine(
        colorize({ all: true }),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        myFormat
    ),
    transports: [new transports.Console()]
})
