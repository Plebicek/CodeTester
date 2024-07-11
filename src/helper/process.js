import { copyFile, rm } from "fs/promises";
import decompress from "decompress";
import path from "path";
import runJavaTest from "./java.js";
import { removeAnswer } from "../models/answer.js";

/**
 * @param input - name of the file
 * @returns - static path string
 */
const uploadPath = () => "/java/uploads";
const testPath = () => "/java/tests/";

/**
 * @param {(string)} input - filename with sufix
 * @returns - path join string
 */
export const uploadFolderPath = function (input) {
  if (input) {
    return path.join(process.cwd(), uploadPath() + `/${input}`);
  } else {
    throw new Error("UploadFolderPath invalid input");
  }
};

/**
 * @param {(string|number)} input - test project name
 * @returns - test project path
 * @throws {Invalid}
 */
export const testFolderPath = function (input) {
  if (input) {
    let string = input.toString();
    return path.join(process.cwd(), testPath() + `/${string}/src/main.zip`);
  } else {
    throw new Error("testFolderPath invalid input");
  }
};

/**
 * Removes main folder after runned tests 
 * @param {(string,number)} input - id of the test folder 
 */
const removeTestMainFolder = async function (input) {
  const folderPath = `${path.join(process.cwd(), testPath() + input)}/src/main` 
  try {
    await rm(folderPath, {force : true, recursive : true})
  } catch (error) {
    console.log("Error when removing main folder after runned tests")
    throw error 
  } 
}

/**
 * @param filename - name of the file to be moved
 * @param testId - folder indicator of the test project
 */
export const moveZipToTestFolder = async function (filename, testId) {
  try {
    await copyFile(uploadFolderPath(filename), testFolderPath(testId));
    return `${testFolderPath(testId)}`;
  } catch (error) {
    console.log("error while moving zip to src folder ", error);
    throw error;
  }
};

export const unzipFolder = async function (testId) {
  try {
    await decompress(
      path.join(process.cwd(), `/java/tests/${testId}/src/main.zip`),
      path.join(process.cwd(), `/java/tests/${testId}/src/main`)
    );
  } catch (err) {
    console.log("error while decompressig main.zip folder", err);
    throw err;
  }
};

/**
 * @param {string} fileId - id.zip name of the file
 * @param {(string|number)} testId - id of the test folder
 */
const runProcess = async function ({ fileId, testId, userId }) {
  try {
    await moveZipToTestFolder(`${fileId}.zip`, testId);
    await unzipFolder(testId);
    await rm(testFolderPath(testId), { force: true });
    await runJavaTest(testId, fileId, userId);
    await removeTestMainFolder(testId) 
  } catch (error) {
    console.log("error while processing test ", error);
    await removeAnswer(userId, fileId)
  }
};

export default runProcess;
