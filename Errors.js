function ArgumentCountError(expected, received) {
  const message = `Expected ${expected} arguments, but received ${received}.`;
  this.message = message;
  this.expected = expected;
  this.received = received;
  Error.captureStackTrace(this, ArgumentCountError);
}

function ErrorFetchingData(message) {
  this.message = message;
  Error.captureStackTrace(this, ErrorFetchingData);
}

module.exports = { ArgumentCountError, ErrorFetchingData };
