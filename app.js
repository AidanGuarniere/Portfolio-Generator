// inquirer requirment 
const inquirer = require('inquirer');

inquirer
    .prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers));
// // file system requirement
// const fs = require("fs");

// // import generatePage requirement
// const generatePage = require("./src/page-template");

// // assign name & github to the HTML
// const pageHTML = generatePage(name, github);

// // write file with file system
// fs.writeFile("./index.html", pageHTML, (err) => {
//   // on fail
//   if (err) throw err;

//   // on success
//   console.log("Portfolio complete! Check out index.html to see the output!");
// });
