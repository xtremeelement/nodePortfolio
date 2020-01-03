const generateHTML = require("./generateHTML.js");
const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");
var gitData;
var convertFactory = require("electron-html-to");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter GitHub Name",
      name: "username"
    },
    {
      type: "list",
      name: "color",
      message: "Choose a color",
      choices: ["green", "blue", "pink", "red"]
    }
  ])
  .then(function(answers) {
    const queryURL = `https://api.github.com/users/${answers.username}`;

    axios.get(queryURL).then(function(res) {
      const pdfStuff = {
        user: answers.username,
        color: answers.color,
        stars: 1,
        image: res.avatar_url,
        followers: res.followers
      };

      const htmlDone = generateHTML(pdfStuff);

      var conversion = convertFactory({
        converterPath: convertFactory.converters.PDF
      });
      conversion({ html: htmlDone }, function(err, result) {
        if (err) {
          return console.error(err);
        }
        result.stream.pipe(fs.createWriteStream("pdf.pdf"));
      });
    });
  });
