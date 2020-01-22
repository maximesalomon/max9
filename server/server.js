const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const axios = require("axios");

const server = express();

server.use(bodyParser.json());
server.use(function(req, res, next) {
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
  const allPictures = await getPictures(req.body.access_token);
  const allLikes = await getAllLikes(allPictures);
  res.status(200).json(allLikes);
});

const getPictures = access_token => {
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
        resolve(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const getAllLikes = async pictures => {
  const userLikes = await Promise.all(
    pictures.map(async pic => {
      if (pic.media_type === "IMAGE") {
          const likes_count = await scrapeImageLikesCount(pic.permalink);
          return likes_count;
      } else {
        return "7"
      }
    })
  );
  return userLikes;
};

const scrapeImageLikesCount = async url => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, {
    waitUntil: "networkidle2"
  });
  const likes_count = await page.$eval(
    ".Nm9Fw button span",
    el => el.innerText
  );
  await browser.close();
  console.log(likes_count)
  return likes_count;
};
