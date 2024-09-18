import logger from "codetester-logger"

export default class AppError extends Error {
    constructor(msg, status, details = null) {
        super(msg)
        this.msg = msg
        this.status = status
        this.details = details
        Error.captureStackTrace(this, this.constructor)
        this.log()
    }

    log() {
        if (this.status == 500) {
            logger.error(`${this.message} [status]: 500`)
        }
    }
}