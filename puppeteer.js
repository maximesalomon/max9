const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("https://www.instagram.com/p/B6yWe5rCpkP/", { waitUntil: "networkidle2" });
  const likes_count = await page.$eval('.Nm9Fw button span', el => el.innerText)
  console.log(likes_count)
  await browser.close();
})();
