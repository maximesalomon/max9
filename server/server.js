const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const functions = require("./functions");

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.listen(7000, () =>
  console.log("Server running on http://localhost:7000")
);

server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/api/max9/", async (req, res) => {
  // console.log(req.headers.access_token)
  const userPosts = await functions.getAllUserPosts(req.headers.access_token);
  // console.log(userPosts)
  const userPostsLikes = await functions.getUserLikes(userPosts);
  console.log(userPostsLikes)
  const userPostsWithLikes = await userPosts.map(pic => {
    let temp = userPostsLikes.find(like => like.url === pic.permalink);
    if (temp.url) {
      pic.permalink = temp.url;
      pic.likes = temp.likes_count;
      pic.wiews_count = temp.views_count;
    }
    return pic;
  });
  res.status(200).json(userPostsWithLikes);
});
