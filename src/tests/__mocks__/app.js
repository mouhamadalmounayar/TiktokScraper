const { generateMockPosts, generateMockUsers } = require("./mocks");
const express = require("express");
const app = express();

const mockPostObject = generateMockPosts(36);
const mockUserObject = generateMockUsers(10);
app.get("/api/post/item_list", (req, res) => {
  return res.status(200).json(mockPostObject.mocks);
});

app.get("/api/recommend/item_list", (req, res) => {
  return res.status(200).json(mockUserObject.mocks);
});
app.get("/test/selectors/followers", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end('<strong data-e2e="followers-count">15</strong>');
});

app.get("/test/selectors/likes", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end('<strong data-e2e="likes-count">15</strong>');
});

module.exports = { app, mockPostObject, mockUserObject };
