const express = require("express");
let Queue = require('bull');
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()

// const functions = require("./functions");

const server = express();

const PORT = process.env.PORT;

let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const igQueue = new Queue('Get Instagram pictures and likes', REDIS_URL);

server.use(cors());
server.use(bodyParser.json());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/api/max9/", async (req, res) => {
  const job = await igQueue.add(req.headers.id);
  res.json(job)
  // res.json({ id: job.id, success: true});
  // console.log(req.headers.access_token)
  // const userPosts = await functions.getAllUserPosts(req.headers.access_token);
  // console.log(userPosts);
  // const userPostsLikes = await functions.getUserLikes(userPosts);
  // console.log(userPostsLikes);
  // const userPostsWithLikes = await userPosts.map(pic => {
  //   let temp = userPostsLikes.find(like => like.url === pic.permalink);
    // console.log(temp)
  //   if (temp) {
  //     pic.permalink = temp.url;
  //     pic.likes = temp.likes_count;
  //     pic.wiews_count = temp.views_count;
  //   }
  //   return pic;
  // });
  // await functions.emptyUserLikes()
  // res.status(200).json(userPostsWithLikes);
});