const express = require("express");
const axios = require("axios");
const randomUseragent = require("random-useragent");
const cheerio = require("cheerio");

const app = express();

app.use(express.json());

const testURL = "https://www.thevillagepharmacy.ca/";
const wafURL = "http://localhost:3200/";

const targetUrl = wafURL;

const numberOfBots = 5;
let count = 0;

// bot making an HTTP request
const botRequest = async (targetUrl) => {
   try {
      const userAgent = randomUseragent.getRandom();
      const config = {
         headers: {
            "User-Agent": userAgent,
         },
      };

      const response = await axios.get(targetUrl, config);

      // Check if request was successful
      if (response.status === 200) {
         const html = response.data;

         const $ = cheerio.load(html);

         // const pageTitle = $("title").text();

         count++;

         // rate-limiting details
         const rateLimit = response?.headers["x-ratelimit-limit"];
         const rateLimitRemaining = response?.headers["x-ratelimit-remaining"];
         const rateLimitReset = response?.headers["x-ratelimit-reset"];
         const retryAfter = response?.headers["retry-after"];

         console.log(`Page Title:  | Request Count: ${count}`);
         // console.log("Response Headers:", response.headers);

         //  // Example: Extract all hyperlinks
         //  $("a").each((index, element) => {
         //     const link = $(element).attr("href");
         //     console.log(`Link ${index + 1}: ${link}`);
         //  });
      } else {
         console.log(`Request failed from ${userAgent}: ${response.status}`);
      }
   } catch (error) {
      console.log(`Error in bot request: ${error.message}`);
   }
};

// Simulate multiple bots sending requests
const simulateBotnet = (targetUrl, numberOfBots) => {
   for (let i = 0; i < numberOfBots; i++) {
      setInterval(() => {
         botRequest(targetUrl);
      }, 400);
   }
};

simulateBotnet(targetUrl, numberOfBots);
