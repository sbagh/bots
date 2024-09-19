//GIVT:
// no ip spoofing
// no user agent spoofing
// no mouse movements /  no keyboard inputs
// no random delays intervals..etc

const axios = require("axios");

// Define target URL for ad clicks
const TARGET_URL = "http://localhost:3200/ad-click";

const performGIVTClick = async (clickCount) => {
   for (let i = 0; i < clickCount; i++) {
      try {
         const response = await axios.get(TARGET_URL, {
            headers: {
               // fixed user agent to make it easier to identify bots
               "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
            },
         });
         console.log("response", response.data);
         console.log(`GIVT Click: ${i + 1}, Status: ${response.status}`);
      } catch (error) {
         console.error(`Error performing GIVT click: ${error}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
   }
};

performGIVTClick(100);
