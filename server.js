import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 3000;

// Initialize Google Generative AI with your API key
const genAI = new GoogleGenerativeAI("");

app.use(express.json());

app.post("/summarize", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      console.error("Invalid content received");
      return res.status(400).send("Content is required for summarization");
    }

    console.log("Content being summarized:", content);

    // Use Google Generative AI to generate the completion
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(content);

    console.log("Google Generative AI Response:", result);
    res.json({ summary: result.response.text() });
  } catch (error) {
    console.error("Error in /summarize endpoint:", error);
    res.status(500).send("Error summarizing content");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
