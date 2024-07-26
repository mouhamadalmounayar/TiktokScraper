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

module.exports = setInterceptors;
