import React, { useState } from "react";
import axios from "axios";

const Journal = () => {
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");
  const [message, setMessage] = useState("");

  // Mood → emoji mapping
  const moodEmojis = {
    Happy: "😊",
    Sad: "😢",
    Angry: "😠",
    Anxious: "😰",
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/journal/add",
        {
          mood,
          entry,
        }
      );
      setMessage(response.data.message);
      setMood("");
      setEntry("");
    } catch (err) {
      console.error(err);
      setMessage("Error saving entry");
    }
  };

  return (
    <div className="container">
      <h2>Mental Health Journal</h2>

      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">Select Mood</option>
        <option value="Happy">😊 Happy</option>
        <option value="Sad">😢 Sad</option>
        <option value="Anxious">😰 Anxious</option>
        <option value="Angry">😠 Angry</option>
      </select>

      {/* Mood Emoji Display */}
      {mood && moodEmojis[mood] && (
        <div className="mood-visual">
          <p style={{ fontSize: "3rem", marginTop: "10px" }}>
            {moodEmojis[mood]}
          </p>
        </div>
      )}

      <br />
      <textarea
        rows={5}
        cols={40}
        placeholder="Write your thoughts..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleSubmit}>Save Entry</button>
      <p className="status-message">{message}</p>
    </div>
  );
};

export default Journal;
