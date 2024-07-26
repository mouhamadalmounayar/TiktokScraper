const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { ErrorFetchingData } = require("../utils/Errors");
const { getFollowerSelector, getLikesSelector } = require("./selectors");
const {
  setUserInterceptorWithAllVideos,
  setUserInterceptor,
} = require("./userInterceptors/index");
const setInterceptors = require("./pageInterceptors/index");
const setFeedInterceptor = require("./feedInterceptor");

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

const setup = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await setInterceptors(page);
  return {
    page: page,
    browser: browser,
  };
};

const fetchDataWithAllVideos = async (username) => {
  const { page, browser } = await setup();
  const dataPromise = setUserInterceptorWithAllVideos(page);
  dataPromise.catch((err) => {
    throw new ErrorFetchingData(err.message);
  });
  try {
    await page.goto(`https://tiktok.com/@${username}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    const result = await getAllData(page, dataPromise);
    return result;
  } catch (error) {
    throw new ErrorFetchingData(error.message);
  } finally {
    await browser.close();
  }
};
const fetchData = async (username) => {
  const { page, browser } = await setup();
  const dataPromise = setUserInterceptor(page);
  dataPromise.catch((err) => {
    throw new ErrorFetchingData(err.message);
  });
  try {
    await page.goto(`https://tiktok.com/@${username}`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    const result = await dataPromise;
    return result;
  } catch (error) {
    throw new ErrorFetchingData(error.message);
  } finally {
    await browser.close();
  }
};

const scrapeFeed = async (number) => {
  const { page, browser } = await setup();
  const dataPromise = setFeedInterceptor(page, number);
  dataPromise.catch((err) => {
    throw new ErrorFetchingData(err.message);
  });
  try {
    await page.goto(`https://tiktok.com/foryou`, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });
    const result = await dataPromise;
    return result;
  } catch (error) {
    throw new ErrorFetchingData(error.message);
  } finally {
    await browser.close();
  }
};

module.exports = { fetchData, fetchDataWithAllVideos, scrapeFeed };
