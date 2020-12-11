// file system requirement
const fs = require("fs");
// inquirer requirement
const inquirer = require("inquirer");
// generate page import
const generatePage = require("./src/page-template");

//  prompt user inquirer questions
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name? (Required)",
      // check that user has answered
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (Required)",
      // check that user has answered
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter your GitHub username!");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      // when confirmAbout is true, prompt user to enter 'about' input
      when: ({ confirmAbout }) => confirmAbout,
    },
  ]);
};

// prompt inquirer project questions with user data
const promptProject = (portfolioData) => {
  console.log(`
=================
Add a New Project
=================
`);

  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  return (
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of your project? (Required)",
          // check that user has answered
          validate: (nameInput) => {
            if (nameInput) {
              return true;
            } else {
              console.log("You need to enter a project name!");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "description",
          message: "Provide a description of the project (Required)",
          // check that user has answered
          validate: (descriptionInput) => {
            if (descriptionInput) {
              return true;
            } else {
              console.log("You need to enter a project description!");
              return false;
            }
          },
        },
        {
          type: "checkbox",
          name: "languages",
          message: "What did you this project with? (Check all that apply)",
          choices: [
            "JavaScript",
            "HTML",
            "CSS",
            "ES6",
            "jQuery",
            "Bootstrap",
            "Node",
          ],
        },
        {
          type: "input",
          name: "link",
          message: "Enter the GitHub link to your project. (Required)",
          // check that user has answered
          validate: (linkInput) => {
            if (linkInput) {
              return true;
            } else {
              console.log("You need to enter a project GitHub link!");
              return false;
            }
          },
        },
        {
          type: "confirm",
          name: "feature",
          message: "Would you like to feature this project?",
          default: false,
        },
        {
          type: "confirm",
          name: "confirmAddProject",
          message: "Would you like to enter another project?",
          default: false,
        },
      ])
      // push project info to projectData
      .then((projectData) => {
        portfolioData.projects.push(projectData);
        // if user wants to add another project
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
          // if the user does not want to add another project, return portfolioData
        } else {
          return portfolioData;
        }
      })
  );
};

// call promptUser function
promptUser()
  // then call promptProject
  .then(promptProject)
  // then pass this portfolioData to the pageHTML through the generatePage function
  .then((portfolioData) => {
    const pageHTML = generatePage(portfolioData);
    // write the index.html with pageHTML
    fs.writeFile("./index.html", pageHTML, (err) => {
      // on fail
      if (err) throw new Error(err);

      // on success
      console.log(
        "Page created! Check out index.html in this directory to see it!"
      );
    });
  });
