const express = require("express");
const bodyParser = require("body-parser");

const functions = require('./functions');

const server = express();

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
  const userPosts = await functions.getUserPosts(req.body.access_token);
  const userPictures = await userPosts.filter(
    post => post.media_type === "IMAGE"
  );
  const userPicturesLikes = await functions.getUserLikes(userPictures);
  // const userPicturesWithLikes = await userPicturesLikes.map((like => {
  //   return userPictures.map(pic => {
  //     return pic.likes = like
  //   });
  // }))
  // console.log(userPicturesWithLikes)
  res.status(200).json(userPicturesLikes);
});