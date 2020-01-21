const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

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

server.get("/max9", async (req, res) => {
  console.log(req.body.permalink);
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(req.body.permalink, {
    waitUntil: "networkidle2"
  });
  const likes_count = await page.$eval(
    ".Nm9Fw button span",
    el => el.innerText
  );
  await browser.close();
  console.log(likes_count)
  res.status(200).json(likes_count);
});

server.listen(7000, () =>
  console.log("Server running on http://localhost:7000")
);
