const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch(
      {
          headless: false,
      }
    );
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto('https://instagram.com');
  await page.screenshot({path: 'instagram.png'});

  await browser.close();
})();