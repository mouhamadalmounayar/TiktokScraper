#! /usr/bin/env node

const fetchData = require("../scraping/index");
const ora = require("ora");
const fs = require("fs");
const { processCommands, containsKey } = require("./parsing");
const { ErrorWritingToFile } = require("../utils/Errors");
const main = async () => {
  const commands = process.argv;
  const flags = processCommands(commands);
  const throbber = ora(
    "Fetching all the data for this account. This may take a few seconds."
  ).start();
  const data = await fetchData(flags);
  throbber.stopAndPersist({
    text: "Done fetching data",
    symbol: "✔️",
  });
  const fileObject = containsKey(flags, "f");
  if (fileObject != null) {
    fs.writeFile(fileObject.f, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        throw new ErrorWritingToFile(err.message);
      } else {
        console.log("✔️ Writing to file successful.");
      }
    });
  } else {
    console.log(data);
  }
};

main();
