import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Journal from "./components/Journal";
import Chatbot from "./components/Chatbot";
import ViewEntries from "./components/Viewentries"; // 🆕
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>🧠 SafeSpace – Your Private Wellness Journal & Chat Companion</h1>

        {/* 🧭 Simple Navigation */}
        <nav style={{ marginBottom: "30px" }}>
          <Link to="/" style={{ marginRight: "20px" }}>
            📝 Journal
          </Link>
          <Link to="/entries">📖 View Entries</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="main-content">
                <Journal />
                <Chatbot />
              </div>
            }
          />
          <Route path="/entries" element={<ViewEntries />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
