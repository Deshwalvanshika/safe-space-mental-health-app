import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Viewentries.css";

const moodEmojis = {
  Happy: "😊",
  Sad: "😢",
  Angry: "😠",
  Anxious: "😰",
};

const ViewEntries = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/journal/all");
        setEntries(res.data);
      } catch (err) {
        console.error("Error fetching entries:", err);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="entries-container">
      <h2>Your Past Journal Entries</h2>
      {entries.map((entry, index) => (
        <div key={index} className="entry-card">
          <div className="entry-header">
            <span className="mood">{moodEmojis[entry.mood] || "📝"}</span>
            <span className="date">
              {new Date(entry.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="entry-text">{entry.entry}</p>
        </div>
      ))}
    </div>
  );
};

export default ViewEntries;
