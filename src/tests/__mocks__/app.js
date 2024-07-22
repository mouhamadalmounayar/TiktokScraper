const express = require("express");
const app = express();

app.get("/api/post/item_list", (req, res) => {
  res.status(200).json({
    itemList: [
      {
        createTime: 1720466267,
        desc: "description for the video.",
        id: 7389346309217443697,
        statsV2: {
          collectCount: 7,
          commentCount: 2,
          diggCount: 24,
          playCount: 2202,
          repostCount: 0,
          shareCount: 1,
        },
        video: {
          duration: 50,
        },
      },
    ],
  });
});

app.get("/test/selectors/followers", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end('<strong data-e2e="followers-count">15</strong>');
});

app.get("/test/selectors/likes", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end('<strong data-e2e="likes-count">15</strong>');
});

module.exports = app;
