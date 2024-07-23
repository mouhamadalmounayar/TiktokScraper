const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { ErrorFetchingData } = require("../utils/Errors");
const { setInterceptors, setApiInterceptors } = require("./interceptors");
const { getFollowerSelector, getLikesSelector } = require("./selectors");
const { containsKey } = require("../scripts/parsing");

puppeteer.use(StealthPlugin());

const getAllData = async (page, promise) => {
  try {
    const followers = await getFollowerSelector(page);
    const likes = await getLikesSelector(page);
    const videos = await promise;
    return {
      nbFollowers: followers,
      nbLikes: likes,
      videos: videos,
    };
  } catch (err) {
    throw new ErrorFetchingData(err.message);
  }
};

const getVideosFromFeed = async (page, promise) => {
  const data = await promise;
  return data;
};
const fetchData = async (flags) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await setInterceptors(page);
  const dataPromise = setApiInterceptors(page, flags);
  dataPromise.catch((err) => {
    throw new ErrorFetchingData(err.message);
  });
  try {
    if (containsKey(flags, "scrapeFromFeed")) {
      await page.goto("https://tiktok.com/foryou", {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      const result = await getVideosFromFeed(page, dataPromise);
      return result;
    } else {
      const usernameObject = containsKey(flags, "username");
      await page.goto(`https://tiktok.com/@${usernameObject.username}`, {
        waitUntil: "networkidle2",
        timeout: 60000,
      });
      const result = await getAllData(page, dataPromise);
      return result;
    }
  } catch (error) {
    throw new ErrorFetchingData(error.message);
  } finally {
    await browser.close();
  }
};

module.exports = fetchData;
