const autoScroll = require("../utils/scroll");
const { containsKey } = require("../scripts/parsing");
const setApiInterceptors = (page, flags) => {
  return new Promise((resolve, reject) => {
    var nbRequests = 0;
    let data = [];
    let visited = new Set();
    page.on("response", async (response) => {
      const request = response.request();
      const url = request.url();
      if (url.includes("/api/post/item_list")) {
        try {
          const jsonData = await response.json();
          const uniqueId = jsonData.itemList[0].createTime;
          if (visited.has(uniqueId)) {
            // do nothing
          } else {
            visited.add(uniqueId);
            nbRequests++;
            jsonData.itemList.forEach((element) => {
              data.push({
                id: element.id,
                duration: element.video.duration,
                views: element.statsV2.playCount,
                creationTime: element.createTime,
                likes: element.statsV2.diggCount,
                comments: element.statsV2.commentCount,
                shares: element.statsV2.shareCount,
                desc: element.desc,
              });
            });
          }
          if (containsKey(flags, "a") != null) {
            await autoScroll(page);
          }
        } catch (error) {
          reject(error);
        } finally {
          resolve(data);
        }
      }
      if (url.includes("/api/recommend/item_list")) {
        try {
          const jsonData = await response.json();
          jsonData.itemList.forEach((element) => {
            data.push({
              username: element.author.uniqueId,
              nickname: element.author.nickname,
              description: element.author.signature,
              stats: {
                followerCount: element.authorStats.followerCount,
                followingCount: element.authorStats.followingCount,
                heartCount: element.authorStats.heartCount,
                videoCount: element.authorStats.videoCount,
              },
            });
          });
        } catch (error) {
          reject(error);
        } finally {
          resolve(data);
        }
      }
    });
  });
};

const setInterceptors = async (page) => {
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (
      ["image", "stylesheet", "font", "media"].includes(request.resourceType())
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });
};

module.exports = { setInterceptors, setApiInterceptors };
