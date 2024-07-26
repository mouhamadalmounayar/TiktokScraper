const autoScroll = require("../../utils/scroll");
const { handlePostItem } = require("../handlers");
const createInterceptor = (page, autoScrollEnabled) => {
  return new Promise((resolve, reject) => {
    let data = [];
    let visited = new Set();
    page.on("response", async (response) => {
      const request = response.request();
      const url = request.url();
      if (url.includes("/api/post/item_list")) {
        try {
          if (autoScrollEnabled) {
            await autoScroll(page);
          }
          await handlePostItem(data, visited, response);
        } catch (error) {
          reject(error);
        } finally {
          resolve(data);
        }
      }
    });
  });
};

module.exports = createInterceptor;
