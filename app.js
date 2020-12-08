// requirements start 

// enable file system
const fs = require("fs");

// import generatePage function from page-template.js
const generatePage = require('./src/page-template.js');

//requirements end 

// create profile data array
const profileDataArgs = process.argv.slice(2);

// assign objects to the array
const [name, github] = profileDataArgs;

// write file with file system
fs.writeFile("./index.html", generatePage(name, github), (err) => {
  // on fail
  if (err) throw new Error(err);

  // on success
  console.log("Portfolio complete! Check out index.html to see the output!");
});
