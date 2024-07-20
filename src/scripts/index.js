#! /usr/bin/env node

const { ArgumentCountError } = require("../utils/Errors");
const fetchData = require("../scraping/index");
const ora = require("ora");

const main = () => {
  if (process.argv.length != 3) {
    throw new ArgumentCountError(2, process.argv.length - 1);
  }
  username = process.argv[2];
  const throbber = ora(
    "Fetching all the data for this account. This may take a few seconds."
  ).start();
  fetchData(username).then((data) => {
    throbber.stop();
    console.log(data);
  });
};

main();
