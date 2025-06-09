// utils/loadTestCases.js
const { time } = require("console");
const fs = require("fs");
const path = require("path");


function loadTestCases(problemName) {
  const basePath = path.join(__dirname, "..", "problems", problemName);
  const inputDir = path.join(basePath, "Input");
  const expectedDir = path.join(basePath, "Expected");

  if (!fs.existsSync(inputDir) || !fs.existsSync(expectedDir)) {
    throw new Error("Input or Expected folder does not exist.");
  }

  const inputFiles = fs.readdirSync(inputDir).sort();
  const expectedFiles = fs.readdirSync(expectedDir).sort();

  if (inputFiles.length !== expectedFiles.length) {
    throw new Error("Mismatched number of input and expected files.");
  }

  const testCases = inputFiles.map((file, i) => ({
    input: fs.readFileSync(path.join(inputDir, file), "utf-8"),
    expected: fs.readFileSync(path.join(expectedDir, expectedFiles[i]), "utf-8"),
  }));
  console.log("[ <=====> ] Test cases Loaded successfuly !")
  return testCases;
}

module.exports = loadTestCases;
