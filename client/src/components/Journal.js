import React, { useState } from "react";
import axios from "axios";
import "./Journal.css";

const Journal = () => {
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");
  const [message, setMessage] = useState("");

  const moodEmojis = {
    Happy: "😊",
    Sad: "😢",
    Angry: "😠",
    Anxious: "😰",
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/journal", {
        mood,
        text: entry,
      });

      setMessage(response.data.message);
      setMood("");
      setEntry("");
    } catch (err) {
      console.error("❌ Error saving entry:", err);
      setMessage("❌ Error saving entry");
    }
  };

  return (
    <div className="container">
      <h2>Mental Health Journal</h2>

      {/* Mood Selection */}
      <label>
        Mood
        <select value={mood} onChange={(e) => setMood(e.target.value)}>
          <option value="">Select Mood</option>
          <option value="Happy">😊 Happy</option>
          <option value="Sad">😢 Sad</option>
          <option value="Anxious">😰 Anxious</option>
          <option value="Angry">😠 Angry</option>
        </select>
      </label>

      {/* Emoji Display */}
      {mood && moodEmojis[mood] && (
        <div className="mood-visual">
          <p style={{ fontSize: "3rem" }}>{moodEmojis[mood]}</p>
        </div>
      )}

      {/* Journal Text */}
      <label>
        Your Journal Entry
        <textarea
          placeholder="Write your thoughts..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        />
      </label>

      <button onClick={handleSubmit}>Save Entry</button>
      <p className="status-message">{message}</p>
    </div>
  );
};

export default Journal;
