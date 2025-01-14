# AI Summarizer

AI Summarizer is a Chrome extension that leverages AI to summarize webpage content, providing concise and informative summaries for articles, blogs, and other online content.

## Features

- **Summarization**: Summarizes webpage content into key points or a TL;DR version.
- **Copy to Clipboard**: Allows users to copy the generated summary with a single click.
- **User-Friendly**: Simple and intuitive interface for ease of use.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **AI Model**: Gemini AI Model

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/khushisatija/AISummarizer.git
   cd AISummarizer
   ```
   
2. Install dependencies for the backend:
   ```bash
   npm install
   ```

3. Start the backend server:
   Add your API key and run
   ```bash
   node server.js
   ```

4. Load the Chrome extension:

  Open Chrome and go to chrome://extensions/.
  Enable "Developer mode" (top right).
  Click Load unpacked and select the AISummarizer folder.

## Usage

  Navigate to any webpage with text content (e.g., news articles, blogs).
  Click on the AI Summarizer Chrome extension icon.
  Click the Summarize button to generate a summary.
  Optionally, click Copy to copy the summary to your clipboard.
