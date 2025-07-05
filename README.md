# 🧠 SafeSpace –Your Private Wellness Journal & Chat Companion

**SafeSpace** is a web application that empowers users to track their emotional well-being through mood-based journaling and receive empathetic support from an AI-powered chatbot.

Built with 💙 for awareness, healing, and self-care.

---

## 🌟 Features

- 📓 **Mood-based Journal**  
  Log your feelings with mood emojis and written reflections.

- 🤖 **AI Chatbot Support**  
  Chat with a kind, supportive GPT-based AI assistant.

- 📅 **View Past Entries**  
  Track and reflect on your mental health journey.

- 🌗 **Dark Mode Toggle**  
  Switch between light and dark themes for comfort.

- 🔐 **User Authentication**  
  Login/Signup using Firebase – keep your data secure and private.

- 🗑️ **Delete Journal Entries**  
  Easily remove old entries with one click.

---

## 🛠️ Tech Stack

| Layer        | Technology                        |
|--------------|------------------------------------|
| **Frontend** | React.js, Axios, CSS               |
| **Backend**  | Node.js, Express.js                |
| **Database** | MongoDB Atlas (via Mongoose)       |
| **Auth**     | Firebase Authentication            |
| **AI Model** | Groq API with LLaMA-3              |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Deshwalvanshika/safe-space-mental-health-app.git
cd safe-space-mental-health-app

# Frontend
cd client
npm install

# Backend
cd ../server
npm install

---

### 2. Set Up Environment Variables

#### 🔐 For Backend (`/server/.env`)
Create a `.env` file in the `/server` folder with:

```env
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key

---

### 4. 🚀 Run the App Locally

```bash
# ▶️ Start the backend server
cd server
node index.js

# ▶️ In a separate terminal/tab, start the React frontend
cd client
npm start
