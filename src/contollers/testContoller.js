import { readdir} from "node:fs/promises"
import multer from "multer";
import path from 'path';
import decompress from "decompress";


let storage = multer.diskStorage({
    destination : function (req,file,cb) {
        cb(null, path.join(process.cwd(), "/src/java/"))
    },
    filename : function (req,file, cb) {
        cb(null, file.originalname)
    }
})

export let upload = multer({storage : storage})

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
    console.log(req.file)
    decompress(path.join(process.cwd(), "/src/java/" + req.file.originalname), "./src/java/")
    res.status(200).json('File was successfully uploaded')
}

