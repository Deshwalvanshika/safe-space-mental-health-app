import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! How are you feeling today? 😊" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    }, 700);

    setInput("");
  };

  const getBotResponse = (input) => {
    const msg = input.toLowerCase();
    if (msg.includes("sad"))
      return "I'm sorry you're feeling sad. Want to talk about it?";
    if (msg.includes("happy"))
      return "That's wonderful! What made you feel happy today?";
    if (msg.includes("anxious"))
      return "It’s okay to feel anxious. Try breathing slowly.";
    return "I'm here for you. Tell me more. 💜";
  };

  return (
    <div className="chatbot-container">
      <h2>💬 Support Chat</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type how you feel..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
