const autoScroll = require("../../utils/scroll");
const { handleRecommendItem } = require("../handlers");

const setFeedInterceptor = (page, number) => {
  return new Promise((resolve, reject) => {
    let data = [];
    let visited = new Set();
    page.on("response", async (response) => {
      const request = response.request();
      const url = request.url();
      if (url.includes("/api/recommend/item_list")) {
        try {
          const minimalNumberOfScrapings = number;
          while (visited.size <= minimalNumberOfScrapings) {
            await handleRecommendItem(data, visited, response);
            await autoScroll(page);
          }
        } catch (error) {
          reject(error);
        } finally {
          resolve(data);
        }
      }
    });
  });
};

module.exports = setFeedInterceptor;
