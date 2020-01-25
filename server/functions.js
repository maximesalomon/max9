const axios = require("axios");
const scrapers = require("./scrapers");

const userLikes = []

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
        if (res.data.data.length === 25) {
          userLikes.push(res.data.data)
          resolve(getNextUserPosts(res.data.paging.next))
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
      .then( res => {
        if(res.data.paging.next) {
          userLikes.push(res.data.data)
          resolve(getNextUserPosts(res.data.paging.next))
        }
        else {
          resolve(userLikes.join());
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

// const getUserLikes = async user_pictures => {
//   if (pic.media_type === "IMAGE") {
//     const user_likes_count = await scrapers
//       .scrapePictureLikesCount(pic.permalink)
//       .then();
//     return user_likes_count;
//   } else if (pic.media_type === "CAROUSEL_ALBUM") {
//     const user_likes_count = await scrapers.scrapePictureLikesCount(
//       pic.permalink
//     );
//     return user_likes_count;
//   } else {
//     const user_likes_count = await scrapers.scrapeVideoLikesCount(
//       pic.permalink
//     );
//     return user_likes_count;
//   }
// };

module.exports = {
  getAllUserPosts
};
