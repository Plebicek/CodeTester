import log from "./logger.js";
export class ErrorMessage extends Error {
    constructor(message = "", status = 500, fatal = 0) {
        super(message)
        this.status = status;
        this.fatal = fatal
    }
}



export default function errorMiddleware(err,req,res, ) {
    switch (err.status) {
        case 404:
            log.info("page not existing")
            break
        case 500:
            log.error(err.message)
            break
    }
    res.end(err.message)

}