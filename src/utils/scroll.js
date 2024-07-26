const autoScroll = async (page) => {
  await page.evaluate(() => {
    return new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= document.body.scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 1);
    });
  });
};

module.exports = autoScroll;
