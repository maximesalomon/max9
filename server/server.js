const express = require('express');
const getLikesCount = require('./puppeteer');

const server = express();

server.get('/', (req, res) => {
  res.send('Hello from Express');
});

server.get('/max9', (req, res) => {
    res.status(200).json(63)
  });

server.listen(7000, () =>
  console.log('Server running on http://localhost:7000')
);