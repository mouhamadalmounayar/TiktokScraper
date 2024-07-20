const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const ora = require("ora");
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
  } catch (err) {
    throw new ErrorFetchingData(err.message);
  }
  const videos = await dataPromise;

  await browser.close();

  return {
    nbFollowers: followers,
    nbLikes: likes,
    videos: videos,
  };
};

module.exports = fetchData;
