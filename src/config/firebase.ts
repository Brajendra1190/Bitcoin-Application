// src/config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"; // Only if you plan to use Analytics
import { getAuth } from "firebase/auth"; // Import if you're using Firebase Auth
import { getFirestore } from "firebase/firestore"; // Import if you're using Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFUUxBtiZT8gExU3C6yvk8gfjOW4_uwls",
  authDomain: "bitsimple-506dc.firebaseapp.com",
  projectId: "bitsimple-506dc",
  storageBucket: "bitsimple-506dc.firebasestorage.app",
  messagingSenderId: "1051899417273",
  appId: "1:1051899417273:web:7183d81eb31484328bc168",
  measurementId: "G-65D63Q3JFC" // Optional, only if using Analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // Optional
const auth = getAuth(app); // Initialize Auth
const db = getFirestore(app); // Initialize Firestore

export { app, analytics, auth, db }; // Export what you need
