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

server.get("/", (req, res) => {
  res.send("Hello from Express");
});

server.get("/api/max9/", async (req, res) => {
  console.log(req.body.user_id);
  console.log(req.body.access_token);
  await axios
    .get("https://graph.instagram.com/me/media", {
      params: {
        fields:
          "id,timestamp,media_type,media_url,thumbnail_url,permalink,caption",
        access_token: req.body.access_token
      }
    })
    .then(res => {
      console.log(res.data.data);
      const pics = res.data.data.map(async pic => {
            const browser = await puppeteer.launch({
            headless: true
          });
          const page = await browser.newPage();
          await page.setViewport({ width: 1440, height: 900 });
          await page.goto(pic.permalink, {
            waitUntil: "networkidle2"
          });
          const likes_count = await page.$eval(
            ".Nm9Fw button span",
            el => el.innerText
          );
          console.log(`${pic.permalink} received ${likes_count} likes`)
          await browser.close();
      })
    })
    .catch(err => {
      console.log(err);
    });
    res.status(200).json("wip");

//   const browser = await puppeteer.launch({
//     headless: true
//   });
//   const page = await browser.newPage();
//   await page.setViewport({ width: 1440, height: 900 });
//   await page.goto("https://www.instagram.com/p/Be5_t9xlHQn/", {
//     waitUntil: "networkidle2"
//   });
//   const likes_count = await page.$eval(
//     ".Nm9Fw button span",
//     el => el.innerText
//   );
//   await browser.close();
//   res.status(200).json(likes_count);
});

server.listen(7000, () =>
  console.log("Server running on http://localhost:7000")
);
