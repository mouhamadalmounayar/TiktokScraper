#! /usr/bin/env node

const { ArgumentCountError } = require("../utils/Errors");
const fetchData = require("../scraping/index");
const ora = require("ora");
const fs = require("fs");

const main = () => {
  let file;
  const commands = process.argv;
  for (let i = 0; i < commands.length - 1; i++) {
    console.log(commands[i]);
    if (commands[i].startsWith("-")) {
      switch (commands[i][1]) {
        case "f":
          file = commands[i + 1];
      }
    }
  }
  username = process.argv[2];
  console.log(`This will be written to ${file}`);
  const throbber = ora(
    "Fetching all the data for this account. This may take a few seconds."
  ).start();
  fetchData(username).then((data) => {
    throbber.stop();
    if (file != null) {
      fs.writeFile(file, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error("Error writing to file");
        } else {
          console.log(`Written to ${file}`);
        }
      });
    } else {
      console.log(data);
    }
  });
};

main();
