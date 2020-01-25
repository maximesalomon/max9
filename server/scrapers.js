const puppeteer = require("puppeteer");

const scrapePictureLikesCount = async url => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  const likes_count = await page.$eval(".Nm9Fw button span", el => el.innerText);
  await browser.close();
  var userLikes = {
    likes_count: likes_count,
    url: url
  };
  return userLikes;
};

const scrapeVideoLikesCount = async url => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  const views_count = await page.$eval(".vcOH2 span", el => el.innerText);
  await page.click(".vcOH2");
  const likes_count = await page.$eval(".vJRqr span", el => el.innerText);
  await browser.close();
  var userLikes = {
    views_count: views_count,
    likes_count: likes_count,
    url: url
  };
  return userLikes;
};

module.exports = {
  scrapePictureLikesCount,
  scrapeVideoLikesCount
};
