import multer from "multer"
import path from "node:path";
import { configDotenv } from "dotenv";
import util from "util"

configDotenv({ path: "../.env" })

const fileDest = () => (path.join(process.cwd(), "/java/uploads"))

/**
 * rename file by answer id
 * @param {object} req 
 * @returns {string} filename
 */
const defineFileName = function (req) {
    return `${req.locals.answerId}.zip`
}

/**
 * Checks if file is compressed 
 */
const multerFileFilter = function (req, file, cb) {
    console.log(file)
    if (file.mimetype != 'application/x-zip-compressed') {
        return cb(new Error("This file type is not supported, use .zip"))
    }
    return cb(null, true)
}

const setFileLimit = function () {
    return parseInt(process.env.FILE_LIMIT) || 1000000
}


const createStorage = function () {
    const result = multer.diskStorage({
        destination: function (req, file, cb) {
            return cb(null, fileDest())
        },
        filename: function (req, file, cb) {
            return cb(null, defineFileName(req))
        }
    })
    return result
}

const storage = createStorage()
const upload = multer({ storage, fileFilter: multerFileFilter, limits: { fileSize: setFileLimit() } }).single("file")
const uploadAsync = util.promisify(upload)
export default uploadAsync 