import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import Journal from "./components/Journal";
import Chatbot from "./components/Chatbot";
import ViewEntries from "./components/Viewentries";
import Signup from "./components/signup";
import Login from "./components/login";

import auth from "./firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  // Toggle theme
  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Router>
      <div className="app-container">
        <h1>🧠 SafeSpace – Your Private Wellness Journal & Chat Companion</h1>

        {/* Show navbar ONLY if user is logged in */}
        {user ? (
          <nav className="navbar">
            <Link to="/journal" className="nav-btn">
              📝 Journal
            </Link>
            <Link to="/chatbot" className="nav-btn">
              🤖 Chatbot
            </Link>
            <Link to="/entries" className="nav-btn">
              📖 View Entries
            </Link>
            <button className="nav-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
            <button onClick={toggleTheme} className="nav-btn">
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </nav>
        ) : (
          <nav className="navbar">
            <Link to="/login" className="nav-btn">
              🔐 Login
            </Link>
            <Link to="/signup" className="nav-btn">
              🆕 Signup
            </Link>
            <button onClick={toggleTheme} className="nav-btn">
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
          </nav>
        )}

        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? "/journal" : "/login"} replace />}
          />
          <Route
            path="/journal"
            element={user ? <Journal /> : <Navigate to="/login" />}
          />
          <Route
            path="/chatbot"
            element={user ? <Chatbot /> : <Navigate to="/login" />}
          />
          <Route
            path="/entries"
            element={user ? <ViewEntries /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/journal" /> : <Signup />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/journal" /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
