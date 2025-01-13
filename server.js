import express from "express";
import OpenAI from "openai";

const app = express();
const PORT = 3000;

// Initialize OpenAI with your API key
const openai = new OpenAI({
  apiKey: "", // Replace with your actual OpenAI API key
});

app.use(express.json());

app.post("/summarize", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      console.error("Invalid content received");
      return res.status(400).send("Content is required for summarization");
    }

    console.log("Content being summarized:", content);

    // Use OpenAI SDK to generate the completion
    const response = await openai.chat.completions.create({
      model: "babbage-002",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes content.",
        },
        {
          role: "user",
          content: `Summarize this: ${content}`,
        },
      ],
      max_tokens: 150,
    });

    console.log("OpenAI API Response:", response);
    res.json(response.choices[0].message.content.trim());
  } catch (error) {
    console.error("Error in /summarize endpoint:", error);
    res.status(500).send("Error summarizing content");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

 