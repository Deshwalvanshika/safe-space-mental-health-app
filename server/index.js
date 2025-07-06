const express = require("express");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const Journal = require("./models/Journal");
// Load environment variables correctly
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" }); // ✅ this ensures the correct path

// Setup express app
const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Chatbot Route
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a kind, supportive mental health companion. Be empathetic and non-judgmental.",
          },
          { role: "user", content: userMessage },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("Groq Error:", err.response?.data || err.message);
    res.status(500).json({ reply: "❌ Failed to get reply." });
  }
});

// ✅ Journal Entry Save Route
app.post("/journal", async (req, res) => {
  const { mood, text } = req.body;

  try {
    const newEntry = new Journal({ mood, text });
    await newEntry.save();
    res.status(201).json({ message: "✅ Entry saved successfully!" });
  } catch (error) {
    console.error("❌ Failed to save entry:", error);
    res.status(500).json({ error: "Error saving entry" });
  }
});
// ✅ Journal GET Route – fetch all saved entries
app.get("/journal", async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 }); // newest first
    res.status(200).json(entries);
  } catch (error) {
    console.error("❌ Failed to fetch entries:", error);
    res.status(500).json({ error: "Error fetching entries" });
  }
});
// ✅ Journal DELETE Route – delete an entry by ID
app.delete("/journal/:id", async (req, res) => {
  try {
    await Journal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "✅ Entry deleted successfully" });
  } catch (error) {
    console.error("❌ Failed to delete entry:", error);
    res.status(500).json({ error: "Error deleting entry" });
  }
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

// Log API key (for debug, you can remove this in prod)
console.log("GROQ API KEY:", process.env.GROQ_API_KEY);
