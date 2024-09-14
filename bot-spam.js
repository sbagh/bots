const express = require("express");
const randomUseragent = require("random-useragent");
const axios = require("axios");
// const cheerio = require("cheerio");
// const HttpsProxyAgent = require("https-proxy-agent");

const app = express();

app.use(express.json());

const testURL = "https://www.thevillagepharmacy.ca/";
const wafURL = "http://localhost:3200/";

const numberOfBots = 1;
let count = 0;

// List of ips for bots, testing on localhost then change to public IPs
const botIPs = [
   "192.168.1.10",
   "192.168.1.11",
   "192.168.1.12",
   "10.0.0.1",
   "10.0.0.2",
   "10.0.0.3",
];
const getRandomBotIP = () => {
   const randomIndex = Math.floor(Math.random() * botIPs.length);
   return botIPs[randomIndex];
};

// Bot making an HTTP request
const botRequest = async (targetURL) => {
   const userAgent = randomUseragent.getRandom();
   const botIP = getRandomBotIP(); // Get a random bot IP

   console.log(`User-Agent: ${userAgent}  -  Bot IP: ${botIP}`);

   try {
      const response = await axios.get(targetURL, {
         headers: {
            "User-Agent": userAgent,
            "X-Forwarded-For": botIP, // Add custom header for simulated IPs
         },
      });

      count++;
      console.log(`Request Count: ${count}  | Status: ${response.status}`);
      console.log("Response data: ", response.data);
   } catch (error) {
      console.error(`Request failed from bot IP ${botIP}: ${error.message}`);
   }
};

// Simulate multiple bots sending requests
const simulateBotnet = (targetURL, numberOfBots) => {
   for (let i = 0; i < numberOfBots; i++) {
      setInterval(() => {
         botRequest(targetURL);
      }, 2000);
   }
};

// Pass the correct host and port to the bot simulation
simulateBotnet(wafURL, numberOfBots);

// // bot making an HTTP request
// const botRequest = async (targetUrl) => {
//    try {
//       const userAgent = randomUseragent.getRandom();
//       const botPort = getRandomBotPort(); // Get a random local port for the bot

//       console.log(`User-Agent: ${userAgent}  -  Bot Port: ${botPort}`);

//       const config = {
//          headers: {
//             "User-Agent": userAgent,
//          },
//       };

//       const response = await axios.get(targetUrl, config);

//       // Check if request was successful
//       if (response.status === 200) {
//          // const html = response.data;
//          // const $ = cheerio.load(html);

//          count++;

//          // rate-limiting details
//          const rateLimit = response?.headers["x-ratelimit-limit"];
//          const rateLimitRemaining = response?.headers["x-ratelimit-remaining"];
//          const rateLimitReset = response?.headers["x-ratelimit-reset"];
//          const retryAfter = response?.headers["retry-after"];

//          console.log(`Request Count: ${count} | Bot from port: ${botPort}`);
//          // console.log("Response Headers:", response.headers);
//       } else {
//          console.log(`Request failed from ${userAgent}: ${response.status}`);
//       }
//    } catch (error) {
//       console.log(`Error in bot request: ${error.message}`);
//    }
// };
