#! /usr/bin/env node

const {
  fetchData,
  fetchDataWithAllVideos,
  scrapeFeed,
} = require("../scraping/index");
const { program } = require("commander");
const ora = require("ora");
const fs = require("fs");

const { ErrorWritingToFile } = require("../utils/Errors");

// defining commands
program
  .name("tiktok-scraper")
  .description("The tiktok scraper cli tool")
  .version("1.0.0");

const main = async (username, options) => {
  const throbber = ora(
    "Fetching all the data for this account. This may take a few seconds."
  ).start();
  let data;
  if (options.all) {
    data = await fetchDataWithAllVideos(username);
  } else {
    data = await fetchData(username);
  }
  throbber.stopAndPersist({
    text: "Done fetching data",
    symbol: "✔️",
  });
  if (options.file) {
    fs.writeFile(options.file, JSON.stringify(data, null, 2), (err) => {
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

const executeScrapeFromFeed = async (number, options) => {
  const throbber = ora("Scraping the for you feed for users").start();
  let data = await scrapeFeed(number);
  throbber.stopAndPersist({
    text: "Done fetching data",
    symbol: "✔️",
  });
  if (options.file) {
    fs.writeFile(options.file, JSON.stringify(data, null, 2), (err) => {
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
program
  .command("scrapeFromFeed")
  .description("fetch users directly from the for you feed.")
  .argument("<number>", "minimal numbers of users to fetch")
  .option("-f, --file <file>", "output file to write data")
  .action((number, options) => {
    number = parseInt(number, 10);
    executeScrapeFromFeed(number, options);
  });
program
  .command("fetch")
  .description("fetch data relative to a certain user")
  .argument("<username>", "username to fetch data for")
  .option("-f , --file <file>", "write data in an output file")
  .option("-a, --all", "fetch all videos")
  .action(main);

program.parse(process.argv);
