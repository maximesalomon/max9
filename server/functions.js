const axios = require("axios");
const scrapers = require("./scrapers");

const getAllUserPosts = access_token => {
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
        if (res.data.data.length !== 25) {
          const tempAllUserPosts = res.data.data;
          const nextUserPosts = await getNextUserPosts(res.data.paging.next);
          const allUserPosts = await nextUserPosts.concat(tempAllUserPosts);
          resolve(await allUserPosts);
        } else {
          resolve(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const getNextUserPosts = url => {
  return new Promise(resolve => {
    axios
      .get(url)
      .then(res => {
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
      if (picture.media_type === "IMAGE") {
        const user_likes_count = await scrapers.scrapePictureLikesCount(
          picture.permalink
        );
        return user_likes_count;
      } else if (picture.media_type === "CAROUSEL_ALBUM") {
        const user_likes_count = await scrapers.scrapePictureLikesCount(
          picture.permalink
        );
        return user_likes_count;
      }
        else {
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
  getAllUserPosts,
  getUserLikes
};
