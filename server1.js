const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

let count = 0;


app.get("/ad-click", (req, res) => {
   count++;
   const headers = req.headers;
   const referer = headers["referer"];
   const userAgent = headers["user-agent"];
   const ip = req.ip;

   console.log(
      `Count: ${count}, IP: ${ip}, User-Agent: ${userAgent}, Referer: ${referer}`
   );

   res.send("Ad clicked!");
});

app.listen(4333, () => {
   console.log("Server running on port 4333");
});
