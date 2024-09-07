import { exec } from "child_process";
import path from "path";
import { setAnswerStats } from "../models/answer.js";

const runJavaTest = function (testFolderId, fileId) {
  return new Promise((res, rej) => {
    let result = '';
    const java = exec("mvn clean test", { //run test
      cwd: javaPathCwd(testFolderId)
    });

    java.stdout.on("data", (data) => {
      result += data; //fetch data
    });

    java.on("close", () => {
      let match;

      try {
        match = result.match(/Tests run: \d+, Failures: \d+, Errors: \d+/).pop(); //last regex match
      } catch (err) {
        return rej(new Error("unknown zero match err " + err));
      }

      let errMatch = result.match(/Errors: \d+/).pop()
      if (errMatch > 0) {
        return rej(new Error("test ran error with value more than 0"))
      }

      return res(match); //return match
    });
  })

    .then(async (value) => {
      const stats = prepareStats(value)
      return await setAnswerStats(stats, fileId)
    });

}

function prepareStats(data) {
  const numbers = data.match(/\d+/g);
  const [total, fail, error] = numbers.map(Number); //depands on order
  const stats = { total, fail, error, pass: (total - fail - error) };
  return stats
}

/** 
 * @param {(string|number)} input - representation of test folder name
 * @returns {string} - path of test project folder where is pom.xml
 */
export const javaPathCwd = function (input) {
  return path.join(process.cwd(), `/java/tests/${input}/`);
};


export default runJavaTest;
