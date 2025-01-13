// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getContent") {
      console.log("Content script received request");
      const content = document.body.innerText; // Get page text
      sendResponse({ content });
    }
  });
  
  