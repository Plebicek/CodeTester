import {exec} from "child_process"
import path  from "path"

const runJavaTest = function(testFolderId) {
    return new Promise((resolve,reject)=>{
        const java = exec("mvn clean test", {cwd : javaPathCwd(testFolderId)})
        console.log(java)
        let result = ""
        let error = ""
        let data = ""

        java.stdout.on("data", (parts)=> {
        data += parts
        })

        java.stderr.on("data", (parts)=> {
            error += parts
        })

        java.on("close", (code) => {
            console.log(error)
            reject(error)
            if (error) {return error}
            console.log(data)
            result = switchCodeStatement(code) 
            console.log(result)
            resolve(result) 
        })
            
        function switchCodeStatement(code) {
            switch (code) {
                case 0:
                    return rawJsonParser(data) //save to db
                
                case 1:
                    return testFailResult(data) //sends the output to the user || outputs fail json object

                default:
                    return defaultTestResult()//sends the output to the user || function returns "test did not run"
            }
        }
    })
}

const defaultTestResult = function () {
    return {"test": "failed", "message" : "unknown reason"}
}

/** //DONE
 * @param {(string|number)} input - representation of test folder name 
 * @returns {string} - path of test project folder where is pom.xml
 */
export const javaPathCwd = function (input) {
    return path.join(process.cwd(), `/java/tests/${input}/`)
}

/**
 * Regex for mesh data
 * @returns {object} - representing test result 
 */
export const rawData = function (data) {
    return data.match(/\{"fail":\d+,"total":\d+,"pass":\d+\}/)[0]
}

export const rawJsonParser = function (data) {
    const rawJson = rawData(data)
    try {
        return JSON.parse(rawJson)
    } catch (error) {
        console.log("Error while testing a task, task id: ")
        throw new Error("Incorrect JSON format") 
    }
}

const testFailResult = function(data) {
    let result = {}
    result.symbol = data.match(/symbol:\s+(.*)/)
    result.location = data.match(/location:\s+(.*)/)
    return result
}

export default runJavaTest