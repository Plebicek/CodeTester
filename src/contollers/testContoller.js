import { readdir} from "node:fs/promises"
import multer from "multer";
import path from 'path';
import decompress from "decompress";

const JAVA_PATH = path.join(process.cwd(), "/java/")


let storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null, JAVA_PATH)
    },
    filename : function (req,file, cb) {
        cb(null, file.originalname)
    }
})

export let upload = multer({storage : storage})

export async function ViewAllTests(req,res,next) {
        /* Load all java folders */
    let dirs = {}
    try {
        const files = await readdir(JAVA_PATH);
        for (const file of files){
            dirs[file] = file}
        res.send(JSON.stringify(dirs))
    } catch (err) {
        res.errorMessage = err
        next()
    }
}

export function viewUploadSolution(req,res) {
    console.log(process.cwd())
    res.render('upload')
}

export function uploadSolution(req,res) {
    console.log(req.file)
    
    decompress(path.join(JAVA_PATH + req.file.originalname), JAVA_PATH)
    res.status(200).json('File was successfully uploaded')
}

