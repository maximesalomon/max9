const puppeteer = require("puppeteer");

const getLikesCount = async (permalink) => {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(permalink, { waitUntil: "networkidle2" });
    const likes_count = await page.$eval('.Nm9Fw button span', el => el.innerText)
    await browser.close();
    console.log(likes_count)
    return likes_count
}

exports.getLikesCount = getLikesCount;

// getLikesCount('https://www.instagram.com/p/B6yWe5rCpkP/')