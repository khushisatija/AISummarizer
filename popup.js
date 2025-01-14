document.getElementById("summarize").addEventListener("click", () => {
  console.log("Summarize button clicked");

  // Get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Send a message to the content script to extract page content
    chrome.tabs.sendMessage(tabs[0].id, { action: "getContent" }, async (response) => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message to content script:", chrome.runtime.lastError.message);
        return;
      }

      console.log("Response from content script:", response);

      if (response?.content) {
        // Fetch the summary using the backend API
        const summary = await fetchSummary(response.content);
        console.log("Generated summary:", summary);
        document.getElementById("summary").value = summary; // Update the textarea with the summary
      } else {
        console.error("No content received from content script.");
        document.getElementById("summary").value = "Failed to fetch content from the page.";
      }
    });
  });
});

// Add a copy-to-clipboard functionality
document.getElementById("copy").addEventListener("click", () => {
  const summary = document.getElementById("summary").value;
  navigator.clipboard
    .writeText(summary)
    .then(() => alert("Copied to clipboard!"))
    .catch((err) => console.error("Error copying to clipboard:", err));
});

// Function to fetch summary from the backend API
async function fetchSummary(content) {
  try {
    console.log("Sending content to backend API:", content);

    const response = await fetch("http://localhost:3000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
    return data.summary; // Return the generated summary
  } catch (error) {
    console.error("Error in fetchSummary:", error);
    return "Failed to generate summary. Please try again.";
  }
}

// Ensure the content script is injected before sending messages
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      files: ["content.js"],
    },
    () => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "getContent" }, (response) => {
        console.log("Response from content script:", response);
      });
    }
  );
});
