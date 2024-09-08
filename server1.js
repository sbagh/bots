const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

let count = 0;

app.get("/bot", (req, res) => {
   const headers = req.headers;
   const userAgent = headers["user-agent"];

   count++;

   console.log("headers:", headers);
   console.log(`Request count: ${count}`);

   let responseMessage = `Request count: ${count}`;

   // Append bot check result to the response message
   if (userAgent.includes("bot")) {
      responseMessage += " - You are a bot!";
   } else {
      responseMessage += " - You are not a bot.";
   }

   // Send the complete response once
   res.send(responseMessage);
});

app.listen(4333, () => {
   console.log("Server running on port 4333");
});
