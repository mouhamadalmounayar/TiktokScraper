const puppeteer = require("puppeteer");
const app = require("../__mocks__/app");
const {
  setApiInterceptors,
  setInterceptors,
} = require("../../scraping/interceptors");

describe("API Interceptors", () => {
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await setInterceptors(page);
    server = app.listen(3000);
  });

  afterAll(async () => {
    await browser.close();
    server.close();
  });

  test("should intercept and process the API response correctly", async () => {
    const expectedData = [
      {
        id: 7389346309217443697,
        duration: 50,
        views: 2202,
        creationTime: 1720466267,
        likes: 24,
        comments: 2,
        shares: 1,
        desc: "description for the video.",
      },
    ];
    const promise = setApiInterceptors(page);
    await page.goto("http://localhost:3000/api/post/item_list", {
      waitUntil: "networkidle0",
    });
    const data = await promise;
    expect(data).toEqual(expectedData);
  });
});
