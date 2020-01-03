const generateHTML = require("./generateHTML.js");
const inquirer = require("inquirer");
const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");
var gitData;

axios.get(queryURL).then(function(res) {
  gitData = res.data;
});
//asdf

(async function() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(`<h1>hellow</h1>`);
    await page.emulateMediaFeatures("screen");
    await page.pdf({
      path: "profile.pdf",
      format: "A4",
      printBackground: true
    });

    console.log("completed");
    await browser.close();
    process.exit();
  } catch (e) {
    console.log("Error", e);
  }
});
