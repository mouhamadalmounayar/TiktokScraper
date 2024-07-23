const autoScroll = require("../utils/scroll");
const { containsKey } = require("../scripts/parsing");
const { handlePostItem, handleRecommendItem } = require("./handlers");
const setApiInterceptors = (page, flags) => {
  return new Promise((resolve, reject) => {
    let data = [];
    let visited = new Set();
    page.on("response", async (response) => {
      const request = response.request();
      const url = request.url();
      if (url.includes("/api/post/item_list")) {
        try {
          await handlePostItem(data, visited, response);
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
          await handleRecommendItem(data, visited, response);
          await autoScroll(page);
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
