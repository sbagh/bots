const express = require("express");
const axios = require("axios");
const randomUseragent = require("random-useragent");
const ProxyAgent = require("proxy-agent");

const app = express();

app.use(express.json());

// Main program configuration
const targetUrl = "http://localhost:4333/bot";
const numberOfBots = 6;
// const proxyList = ["http://proxy1.com", "http://proxy2.com"]; // Example proxy list (replace with real proxies)

// simulate a bot making an HTTP request
const botRequest = async (targetUrl, proxy) => {
   try {
      const userAgent = randomUseragent.getRandom();
      const config = {
         headers: {
            "User-Agent": userAgent,
         },
      };

      //   if (proxy) {
      //      config.httpAgent = new ProxyAgent(proxy);
      //   }

      const response = await axios.get(targetUrl, config);

      const data = response.data;

      console.log("data:", data);
      //   console.log(`Request successful from ${userAgent}: ${response.status}`);
   } catch (error) {
      console.log(`Error in bot request: ${error.message}`);
   }
};

//simulate multiple bots sending requests
const simulateBotnet = (targetUrl, numberOfBots, proxyList) => {
   for (let i = 0; i < numberOfBots; i++) {
      //   const proxy =
      //      proxyList.length > 0 ? proxyList[i % proxyList.length] : null;

      setInterval(() => {
         botRequest(targetUrl);
      }, 200);
   }
};

simulateBotnet(targetUrl, numberOfBots);
