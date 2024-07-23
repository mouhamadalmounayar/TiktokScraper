const { InvalidUsageError } = require("../utils/Errors");

const processCommands = (commands) => {
  let file;

  for (let i = 2; i < commands.length - 1; i++) {
    if (commands[i].startsWith("-")) {
      const flag = commands[i][1];

      switch (flag) {
        case "f":
          if (i + 1 == commands.length) {
            throw new InvalidUsageError("No file specified after -f flag.");
          }

          file = commands[i + 1];
          break;

        default:
          throw new InvalidUsageError(`Unknown flag -${flag}`);
      }
    }
  }

  return file;
};

module.exports = processCommands;
