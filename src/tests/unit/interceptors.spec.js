const puppeteer = require("puppeteer");
const { app, mockPostObject, mockUserObject } = require("../__mocks__/app");
const { setUserInterceptor } = require("../../scraping/userInterceptors/index");

const setFeedInterceptor = require("../../scraping/feedInterceptor/index");
const setInterceptors = require("../../scraping/pageInterceptors/index");
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

  test("should intercept and process the API response for users correctly", async () => {
    const expectedData = mockPostObject.results;
    const promise = setUserInterceptor(page);
    await page.goto("http://localhost:3000/api/post/item_list", {
      waitUntil: "networkidle2",
    });
    const data = await promise;
    expect(data).toEqual(expectedData);
  });

  test("should intercept and process the API response from the feed correctly", async () => {
    const expectedData = mockUserObject.results;
    const promise = setFeedInterceptor(page, 4);
    await page.goto("http://localhost:3000/api/recommend/item_list", {
      waitUntil: "networkidle2",
    });
    const data = await promise;
    expect(data).toEqual(expectedData);
  });
});
