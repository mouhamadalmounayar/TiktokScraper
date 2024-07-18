const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const ora = require("ora");
const { ArgumentCountError, FetchingDataError } = require("./Errors");
puppeteer.use(StealthPlugin());
const fetchData = async (username) => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();

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

  try {
    // setup for intercepting api requests
    const dataPromise = new Promise((resolve, reject) => {
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
      });
    });

    await page.goto(`https://www.tiktok.com/@${username}`, {
      waitUntil: "networkidle2",
    });

    // getting the number of followers

    await page.waitForSelector('strong[data-e2e = "followers-count"]');
    const followers = await page.evaluate(() => {
      const selected = document.querySelector(
        'strong[data-e2e = "followers-count"]'
      ).innerText;
      if (selected.includes("K")) return parseFloat(selected) * 1000;
      if (selected.includes("M")) return parseFloat(selected) * 1000000;
      return parseFloat(selected);
    });

    // getting the number of likes
    await page.waitForSelector('strong[data-e2e = "likes-count"]');
    const likes = await page.evaluate(() => {
      const selected = document.querySelector(
        'strong[data-e2e = "likes-count"]'
      ).innerText;
      if (selected.includes("K")) return parseFloat(selected) * 1000;
      if (selected.includes("M")) return parseFloat(selected) * 1000000;
      return parseFloat(selected);
    });

    // information from intercepted api calls
    const videos = await dataPromise;

    return {
      global_followers: followers,
      global_likes: likes,
      videos: videos,
    };
  } catch (error) {
    throw new FetchingDataError("There was an error fetching the data.");
  } finally {
    await browser.close();
  }
};

const main = () => {
  if (process.argv.length != 3) {
    throw new ArgumentCountError(3, process.argv.length);
  }
  username = process.argv[2];
  const throbber = ora(
    "Fetching all the data for this account. This may take a few seconds."
  ).start();
  fetchData(username).then((data) => {
    throbber.stop();
    console.log(data);
  });
};

main();

module.exports = fetchData;
