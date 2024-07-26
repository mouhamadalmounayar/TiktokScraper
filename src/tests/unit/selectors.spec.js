const puppeteer = require("puppeteer");
const { app } = require("../__mocks__/app");
const {
  getFollowerSelector,
  getLikesSelector,
} = require("../../scraping/selectors");
const setInterceptors = require("../../scraping/pageInterceptors/index");
describe("tests for selectors ", () => {
  let browser;
  let page;
  let server;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await setInterceptors(page);
    server = app.listen(3001);
  });
  afterAll(async () => {
    await browser.close();
    server.close();
  });

  test("should parse the number of followers from an html page", async () => {
    await page.goto("http://localhost:3001/test/selectors/followers");
    const expectedResult = 15;
    const result = await getFollowerSelector(page);
    expect(result).toEqual(expectedResult);
  });

  test("should parse the number of likes from an html page", async () => {
    await page.goto("http://localhost:3001/test/selectors/likes");
    const expectedResult = 15;
    const result = await getLikesSelector(page);
    expect(result).toEqual(expectedResult);
  });
});
