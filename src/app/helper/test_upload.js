import multer from "multer"
import path from "node:path";
import { configDotenv } from "dotenv";
import util from "util"
import { createTest } from "../models/admin.js";

configDotenv({path : "../.env"})

const fileDest = () => (path.join(process.cwd(), "/java/uploads/"))

/**
 * rename file by test id
 * @param {object} req 
 * @returns {string} filename
 */
const defineFileName = function(id) {
    return `test_${id}.zip` 
}

/**
 * Checks if file is compressed 
 */
const multerFileFilter = function(req,file, cb) {
  if (file.mimetype != 'application/x-zip-compressed') {
    return cb(new Error("This file type is not supported, use .zip"))
  }
  return cb(null, true)
}

const createStorage =function () {
    const result = multer.diskStorage({
        destination : function (req,file, cb) {
            return cb(null, fileDest())
        },
        filename : async function (req,file,cb) {
            const taskId = req.params.taskId
            const {test_id} = await createTest(taskId)
            req.locals.testId = test_id
            return cb(null,defineFileName(test_id))
        }
    })
    return result 
}

const storage = createStorage() 
const upload = multer({storage, fileFilter : multerFileFilter}).single("file")
const testUploadAsync = util.promisify(upload)
export default testUploadAsync 