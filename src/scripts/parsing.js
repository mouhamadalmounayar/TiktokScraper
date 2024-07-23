const { InvalidUsageError } = require("../utils/Errors");
const containsKey = (arr, key) => arr.find((obj) => key in obj);
const processFlag = (flag, index, commands, flags) => {
  switch (flag) {
    case "f":
      if (index + 1 == commands.length) {
        throw new InvalidUsageError("No file specified after -f flag.");
      }
      file = commands[index + 1];
      flags.push({ f: file });
      break;
    case "a":
      flags.push({ a: "" });
      break;
    default:
      throw new InvalidUsageError(`Unknown flag -${flag}`);
  }
};

const processScrapeFromFeed = (index, commands, flags) => {
  if (index + 1 === commands.length) {
    throw new InvalidUsageError(
      "An option needs to be specified after the command scrapeFromFeed"
    );
  }
  const option = commands[index + 1];
  switch (option) {
    case "--users":
      flags.push({ scrapeFromFeed: "users" });
      break;
    default:
      throw new InvalidUsageError(`Invalid option ${option}`);
  }
};
const processCommands = (commands) => {
  let flags = [];
  for (let i = 0; i < commands.length; i++) {
    if (commands[i].startsWith("-")) {
      const flag = commands[i][1];
      processFlag(flag, i, commands, flags);
    } else if (commands[i] === "scrapeFromFeed") {
      processScrapeFromFeed(i, commands, flags);
      break;
    }
  }
  if (containsKey(flags, "scrapeFromFeed") == null)
    flags.push({ username: commands[commands.length - 1] });

  return flags;
};

module.exports = { processCommands, containsKey };
