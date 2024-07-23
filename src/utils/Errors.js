function InvalidUsageError(message) {
  this.message = message;
  Error.captureStackTrace(this, InvalidUsageError);
}

function ErrorFetchingData(message) {
  this.message = message;
  Error.captureStackTrace(this, ErrorFetchingData);
}

function ErrorWritingToFile(message) {
  this.message = message;
  Error.captureStackTrace(this, ErrorFetchingData);
}
module.exports = { InvalidUsageError, ErrorFetchingData, ErrorWritingToFile };
