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
  const likes_count = await page.$eval(
    ".Nm9Fw button span",
    el => el.innerText
  );
  await browser.close();
  var userLikes = {
    likes_count: likes_count,
    url: url
  };
  return userLikes;
};

const scrapeVideoLikesCount = async url => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  await setTimeout(() => {}, 5000);
  const view_count = await page.$eval('.vcOH2 span', el => el.innerText)
  await page.click('.vcOH2')
  // const likes_count = await page.$eval(
  //   ".Nm9Fw button span",
  //   el => el.innerText
  // );
  await browser.close();
  // var userLikes = {
  //   likes_count: likes_count,
  //   url: url
  // };
  // return userLikes;
  console.log(`Video view_count = ${view_count}`)
};

const scrapeCarouseLikesCount = async url => {
  return;
};

scrapeVideoLikesCount('https://www.instagram.com/p/BZTq5d3F4KR/');

module.exports = {
  scrapePictureLikesCount,
  scrapeVideoLikesCount,
  scrapeCarouseLikesCount
};
