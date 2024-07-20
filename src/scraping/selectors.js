const getFollowerSelector = async (page) => {
  await page.waitForSelector('strong[data-e2e = "followers-count"]');
  return await page.evaluate(() => {
    const selected = document.querySelector(
      'strong[data-e2e = "followers-count"]'
    ).innerText;
    if (selected.includes("K")) return parseFloat(selected) * 1000;
    if (selected.includes("M")) return parseFloat(selected) * 1000000;
    return parseFloat(selected);
  });
};

const getLikesSelector = async (page) => {
  await page.waitForSelector('strong[data-e2e = "likes-count"]');
  return (likes = await page.evaluate(() => {
    const selected = document.querySelector(
      'strong[data-e2e = "likes-count"]'
    ).innerText;
    if (selected.includes("K")) return parseFloat(selected) * 1000;
    if (selected.includes("M")) return parseFloat(selected) * 1000000;
    return parseFloat(selected);
  }));
};

module.exports = { getFollowerSelector, getLikesSelector };
