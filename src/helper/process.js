import { copyFile, rm } from "fs/promises";
import decompress from "decompress";
import path from "path";
import runJavaTest from "./java.js";

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
 * @param filename - name of the file to be moved
 * @param testFolder - folder indicator of the test project
 */
export const moveZipToTestFolder = async function (filename, testFolder) {
  //move from uploads to folder /test/${1}/src/here.zip
  try {
    await copyFile(uploadFolderPath(filename), testFolderPath(testFolder));
    return `${testFolderPath(testFolder)}`;
  } catch (error) {
    console.log("error while moving zip to src folder ", error);
    throw error;
  }
};

export const unzipFolder = async function (testFolder) {
  try {
    await decompress(
      path.join(process.cwd(), `/java/tests/${testFolder}/src/main.zip`),
      path.join(process.cwd(), `/java/tests/${testFolder}/src/main`)
    );
  } catch (err) {
    console.log("error while decompressig main.zip folder", err);
    throw err;
  }
};

/**
 * @param {string} filename - id.zip name of the file
 * @param {(string|number)} - id of the test folder
 * @returns {object} - results of the test
 */
const runProcess = async function ({ filename, testFolder, userId }) {
  try {
    await moveZipToTestFolder(`${filename}.zip`, testFolder);
    await unzipFolder(testFolder);
    await rm(testFolderPath(testFolder), { force: true });
    return await runJavaTest(testFolder, filename, userId);
  } catch (error) {
    console.log("error while processing test ");
    return error;
  }
};

export default runProcess;
