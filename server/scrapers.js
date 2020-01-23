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
  // console.log(userLikes);
  return userLikes;
};


module.exports = {
    scrapePictureLikesCount
}