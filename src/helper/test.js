import { rm, } from "fs/promises";
import decompress from "decompress";
import path from "path";
import { copy } from "fs-extra";

/**
 * Path to the project zip file 
 * @returns "java/project.zip"
 */
const projectPath = () => (path.join(process.cwd(), "java/project.zip"))

/**
 * Path to the test unziped folder 
 * @param id created testId 
 * @returns `java/tests/${id}` 
 */
const testPath = (id) => (path.join(process.cwd(), `java/tests/${id}`))

/**
 * Path to the uploaded test zip file 
 * @param id - test project id 
 * @returns `java/uploads/test_${id}.zip` 
 */
const zipFilePath = (id) => (path.join(process.cwd(), `java/uploads/test_${id}.zip`)) 

/**
 * Unzip project as testid in tests dir 
 * @param number testId 
 */
const decompressProject = async function (testId) {
  try {
    await decompress(projectPath(), testPath(testId))
  } catch(error) {
    console.log("Error when decomproesspign project folder", testId, error)
    throw error
  }
}

/**
 * Decompress uploaded zip file  
 * @param testId 
 */
const decompressZip = async function (testId) {
  try {
    await decompress(zipFilePath(testId),testPath(testId)+"/src/test/")
  } catch (error) {
    console.log("Error when decomporessing zip ", testId, error)
    throw error 
  }
}

/**
 * 
 * @param src - path for test project 
 * @param dest - path where files will be copied 
 */
const copyFolder = async function(src, dest) {
  try {
    await copy(src,dest)
  } catch (error) {
    console.log("failed to copy folders")
  }
}

const testProcess = async function({testId}){
    const path = testPath(testId)
    try {
        await decompressProject(testId)
        await copyFolder(path+"/project/", path+"/")
        await rm(path+"/project",{recursive : true, force : true})
        await decompressZip(testId)
    } catch (error) {
       console.log("Error when uploading test", error) 
    }
}

export default testProcess;