const puppeteer = require("puppeteer");
const { app, mockObjects } = require("../__mocks__/app");
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
    const expectedData = mockObjects.results;
    const flags = [];
    const promise = setApiInterceptors(page, flags);
    await page.goto("http://localhost:3000/api/post/item_list", {
      waitUntil: "networkidle0",
    });
    const data = await promise;
    expect(data).toEqual(expectedData);
  });
});
