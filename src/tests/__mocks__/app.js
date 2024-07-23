const generateMockObjects = require("./mocks");
const express = require("express");
const app = express();

const mockObjects = generateMockObjects(36);

app.get("/api/post/item_list", (req, res) => {
  res.status(200).json(mockObjects.mocks);
});

app.get("/test/selectors/followers", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end('<strong data-e2e="followers-count">15</strong>');
});

app.get("/test/selectors/likes", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end('<strong data-e2e="likes-count">15</strong>');
});

module.exports = { app, mockObjects };
