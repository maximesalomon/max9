const express = require("express");
let Queue = require("bull");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const functions = require("./functions");

const server = express();

const PORT = process.env.PORT;

let REDIS_URL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

const igQueue = new Queue("Instagram", REDIS_URL);

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

server.post("/api/max9/", async (req, res) => {
  let job = await igQueue.add({ access_token: req.body.access_token });
  const userPosts = await functions.getAllUserPosts(req.body.access_token);
  res
    .status(200)
    .json({ job_id: parseInt(job.id), user_posts_length: userPosts.length });
});

server.get("/api/max9/:id", async (req, res) => {
  const id = req.params.id;
  const job = await igQueue.getJob(id);
  if (job === null) {
    res.status(404).end();
  } else {
    let state = await job.getState();
    let progress = job._progress;
    let reason = job.failedReason;
    let returnvalue = job.returnvalue;
    res.json({ id, state, progress, reason, returnvalue });
  }
});

igQueue.process(7, async job => {
  console.log(job);
  console.log(`Worker is running ${job.id}`);
  const userPosts = await functions.getAllUserPosts(job.data.access_token);
  console.log("Retrieved all userPosts");
  const userPostsLikes = await functions.getUserLikes(userPosts);
  console.log("Retrieved all userPostsLikes");
  console.log(userPostsLikes);
  const userPostsWithLikes = await userPosts.map(pic => {
    let temp = userPostsLikes.find(like => like.url === pic.permalink);
    if (temp) {
      pic.permalink = temp.url;
      pic.likes = temp.likes_count;
      pic.wiews_count = temp.views_count;
    }
    return pic;
  });
  console.log("All userPostsWithLikes");
  console.log(userPostsWithLikes);
  const max9 = userPostsWithLikes
    .sort((a, b) => (parseInt(a.likes) < parseInt(b.likes) ? 1 : -1))
    .slice(0, 9);
  return max9;
});

// .on('completed', (job, result) => {
//   // Job completed with output result!
// })