// file system requirement
const fs = require("fs");
const { resolve } = require("path");

// write file function
const writeFile = (fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile("./dist/index.html", fileContent, (err) => {
      // reject and send error to .catch on fail
      if (err) {
        reject(err);
        // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
        return;
      }

      // on success
      resolve({
        ok: true,
        message: "File created!",
      });
    });
  });
};

const copyFile = () => {
  return new Promise((resolve, reject) => {
    // copy style.css to dist folder
    fs.copyFile("./src/style.css", "./dist/style.css", (err) => {
      // reject and send error to .catch on fail
      if (err) {
        reject(err);
        // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
        return;
      }

      // on success
      resolve({
        ok: true,
        message: "File copied!",
      });
    });
  });
};

module.exports = { writeFile, copyFile };