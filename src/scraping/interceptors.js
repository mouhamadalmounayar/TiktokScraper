const setApiInterceptors = (page) => {
  return new Promise((resolve, reject) => {
    page.on("response", async (response) => {
      const request = response.request();
      const url = request.url();
      if (url.includes("/api/post/item_list")) {
        try {
          const jsonData = await response.json();
          let filteredData = [];
          jsonData.itemList.forEach((element) => {
            filteredData.push({
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
          resolve(filteredData);
        } catch (error) {
          reject(error);
        }
      }
      // other api endpoints to add later...
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

module.exports = {setInterceptors , setApiInterceptors}
