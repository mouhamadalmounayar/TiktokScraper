const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { ErrorFetchingData } = require("../utils/Errors");
const { setInterceptors, setApiInterceptors } = require("./interceptors");
const { getFollowerSelector, getLikesSelector } = require("./selectors");

puppeteer.use(StealthPlugin());
const fetchData = async (username) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await setInterceptors(page);
  const dataPromise = setApiInterceptors(page);
  dataPromise.catch((err) => {
    throw new ErrorFetchingData(err.message);
  });

  await page.goto(`https://tiktok.com/@${username}`);
  try {
    const followers = await getFollowerSelector(page);
    const likes = await getLikesSelector(page);
    const videos = await dataPromise;
    return {
      nbFollowers: followers,
      nbLikes: likes,
      videos: videos,
    };
  } catch (err) {
    throw new ErrorFetchingData(err.message);
  } finally {
    await browser.close();
  }
};

module.exports = fetchData;
