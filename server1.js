const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.get("/bot", (req, res) => {
   const headers = req.headers;
   const userAgent = headers["user-agent"];

   console.log("headers:", headers);
   console.log(`Request from ${userAgent}`);

   // Check if the request is coming from a bot
   if (userAgent.includes("bot")) {
      res.send("You are a bot!");
   } else {
      res.send("You are not a bot.");
   }
});

app.listen(4333, () => {
   console.log("Server running on port 3000");
});
