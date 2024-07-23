const { InvalidUsageError } = require("../utils/Errors");
const containsKey = (arr, key) => arr.find((obj) => key in obj);
const processCommands = (commands) => {
  let flags = [];
  for (let i = 2; i < commands.length - 1; i++) {
    if (commands[i].startsWith("-")) {
      const flag = commands[i][1];

      switch (flag) {
        case "f":
          if (i + 1 == commands.length) {
            throw new InvalidUsageError("No file specified after -f flag.");
          }

          file = commands[i + 1];
          flags.push({ f: file });
          break;
        case "a":
          flags.push({ a: "" });
          break;
        default:
          throw new InvalidUsageError(`Unknown flag -${flag}`);
      }
    }
  }

  return flags;
};

module.exports = { processCommands, containsKey };
