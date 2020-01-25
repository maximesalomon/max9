const axios = require("axios");
const scrapers = require("./scrapers");

const getUserPosts = access_token => {
  return new Promise(resolve => {
    axios
      .get("https://graph.instagram.com/me/media", {
        params: {
          fields:
            "id,timestamp,media_type,media_url,thumbnail_url,permalink,caption",
          access_token: access_token
        }
      })
      .then(res => {
        console.log(res.data)
        resolve(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const getUserLikes = async user_pictures => {
  const userLikes = await Promise.all(
    user_pictures.map(async picture => {
      if (picture.media_type === "IMAGE" || "CCAROUSEL_ALBUM") {
        const user_likes_count = await scrapers.scrapePictureLikesCount(
          picture.permalink
        );
        return user_likes_count;
      } else {
          const user_likes_count = await scrapers.scrapeVideoLikesCount(
          picture.permalink
        );
        return user_likes_count;
      }
    })
  );
  return userLikes;
};

module.exports = {
  getUserPosts,
  getUserLikes
};
