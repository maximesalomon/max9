const axios = require("axios");
const puppeteer = require("puppeteer");
const scrapers = require("./scrapers");

const getAllUserPosts = access_token => {
  const userLikes = [];

  const getNextUserPosts = url => {
    return new Promise(resolve => {
      axios
        .get(url)
        .then(res => {
          if (res.data.paging.next) {
            userLikes.push(res.data.data);
            resolve(getNextUserPosts(res.data.paging.next));
          } else {
            // console.log(userLikes);
            resolve(userLikes.flat())
          }
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  return new Promise(resolve => {
    axios
      .get("https://graph.instagram.com/me/media", {
        params: {
          fields:
            "id,timestamp,media_type,media_url,thumbnail_url,permalink,caption",
          access_token: access_token
        }
      })
      .then(async res => {
        if (res.data.data.length === 25) {
          userLikes.push(res.data.data);
          resolve(getNextUserPosts(res.data.paging.next));
        } else {
          resolve(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const getUserLikes = async user_pictures => {
  const userLikes = []
  const browser = await puppeteer.launch({
    headless: true
  });
  for await (let pic of user_pictures) {
    if (pic.media_type === "IMAGE") {
      const user_likes_count = await scrapers.scrapePictureLikesCount(
        browser,
        pic.permalink
      );
      console.log(user_likes_count);
      userLikes.push(user_likes_count);
    } else if (pic.media_type === "CAROUSEL_ALBUM") {
      const user_likes_count = await scrapers.scrapePictureLikesCount(
        browser,
        pic.permalink
      );
      console.log(user_likes_count);
      userLikes.push(user_likes_count);
    } else {
      const user_likes_count = await scrapers.scrapeVideoLikesCount(
        browser,
        pic.permalink
      );
      console.log(user_likes_count);
      userLikes.push(user_likes_count);
    }
    
  }
  await browser.close();
  return userLikes;
};

module.exports = {
  getAllUserPosts,
  getUserLikes
};
