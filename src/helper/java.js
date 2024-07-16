import { exec } from "child_process";
import path from "path";
import { setAnswerStats, removeAnswer } from "../models/answer.js";

const runJavaTest = function (testFolderId, fileId, userId) {
  return new Promise((resolve, reject) => {
    const java = exec("mvn clean test", { cwd: javaPathCwd(testFolderId) });
    let data = "";

    java.stdout.on("data", (parts) => {
      data += parts;
    });

    java.on("close", async (code) => {
      await switchCodeStatement(code);
      return resolve();
    });

    async function switchCodeStatement(code) {
      switch (code) {
        case 0:
          return await setPassingResult(data, fileId);

        case 1:
          return await testFailResult(fileId, userId); 

        default:
          return await testFailResult(fileId, userId); 
      }
    }
  });
};

/**
 *
 * @param {string} data - raw data from child process
 * @returns {object}
 */
export const rawJsonParser = function (data) {
  const rawJson = rawData(data);
  try {
    return JSON.parse(rawJson);
  } catch (error) {
    console.log("Error while testing a task, task id: ");
    throw new Error("Incorrect JSON format");
  }
};

/**
 * Regex for mesh data
 */
export const rawData = function (data) {
  return data.match(/\{"fail":\d+,"total":\d+,"pass":\d+\}/)[0];
};

/**
 * Runs when zero passed from child process
 */
const setPassingResult = async function (data, answerId) {
  const result = rawJsonParser(data);
  return await setAnswerStats(result, answerId);
};

/** //DONE
 * @param {(string|number)} input - representation of test folder name
 * @returns {string} - path of test project folder where is pom.xml
 */
export const javaPathCwd = function (input) {
  return path.join(process.cwd(), `/java/tests/${input}/`);
};

const testFailResult = async function (answerId, userId) {
  return await removeAnswer(userId, answerId);
};

export default runJavaTest;
