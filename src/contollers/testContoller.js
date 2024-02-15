import { readdir} from "node:fs/promises"
import multer from "multer";
import { Parse } from "unzipper";

let storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null, '/java/')
    },
    filename : function (req,file, cb) {
        cb(null, file.fieldname)
    }
})

let upload = multer({storage : storage})

const javaPath = "/root/repos/CodeTester/src/java"

export async function ViewAllTests(req,res,next) {
        /* Load all java folders */
    let dirs = {}
    try {
        const files = await readdir(javaPath);
        for (const file of files){
            dirs[file] = file}
        res.send(JSON.stringify(dirs))
    } catch (err) {
        res.errorMessage = err
        next()
    }
}

export function viewUploadSolution(req,res) {
    res.render('upload')
}

export function uploadSolution(req,res) {
    res.status(200).json('File was successfully uploaded')
}