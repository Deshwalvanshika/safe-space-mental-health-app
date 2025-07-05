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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:8000/journal");
      setEntries(res.data);
    } catch (err) {
      console.error("Error fetching entries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/journal/${id}`);
      alert("Entry deleted!");
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete entry.");
    }
  };

  return (
    <div className="entries-container">
      <h2>Your Past Journal Entries</h2>

      {loading ? (
        <p>Loading entries...</p>
      ) : entries.length === 0 ? (
        <p>No journal entries found yet. Start by writing your first one!</p>
      ) : (
        entries.map((entry) => (
          <div key={entry._id} className="entry-card">
            <div className="entry-header">
              <span className="mood">{moodEmojis[entry.mood] || "📝"}</span>
              <span className="date">
                {new Date(entry.date).toLocaleString()}
              </span>
            </div>
            <p className="entry-text">{entry.text}</p>
            <button
              className="delete-btn"
              onClick={() => handleDelete(entry._id)}
            >
              🗑️ Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewEntries;
