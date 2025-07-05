// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGNZcQepjkngDEu8cc12VHgOY2fm3CP8k",
  authDomain: "safespace-7a56d.firebaseapp.com",
  projectId: "safespace-7a56d",
  storageBucket: "safespace-7a56d.appspot.com",
  messagingSenderId: "993384985655",
  appId: "1:993384985655:web:fc757742a27fd04969fbb2",
};

const app = initializeApp(firebaseConfig);

// ✅ export app
export default app;
