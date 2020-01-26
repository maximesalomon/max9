const scrapePictureLikesCount = async (browser, url) => {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url);
    const likes_count = await page.$eval(
      ".Nm9Fw button span",
      el => el.innerText
    );
    var userLikes = {
      likes_count: likes_count,
      url: url
    };
    // console.log(userLikes)
    await page.close();
    return userLikes;
  } catch (e) {
    console.error(e);
    return userLikes = {
      likes_count: '0',
      url: url
    };
  }
};

const scrapeVideoLikesCount = async (browser, url) => {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(url);
    const views_count = await page.$eval(".vcOH2 span", el => el.innerText);
    await page.click(".vcOH2");
    const likes_count = await page.$eval(".vJRqr span", el => el.innerText);
    var userLikes = {
      views_count: views_count,
      likes_count: likes_count,
      url: url
    };
    await page.close();
    // console.log(userLikes)
    return userLikes;
  } catch (e) {
    console.error(e);
    return userLikes = {
      views_count: '0',
      likes_count: '0',
      url: url
    };
  }
};

// scrapePictureLikesCount('https://www.instagram.com/p/B6X2XMmIwo1/')
// scrapeVideoLikesCount('https://www.instagram.com/p/BZTq5d3F4KR/')

module.exports = {
  scrapePictureLikesCount,
  scrapeVideoLikesCount
};
