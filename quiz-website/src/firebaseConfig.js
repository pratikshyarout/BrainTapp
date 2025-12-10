// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8rxDOD_RZ1QQIpkvJnskc9vNOlJ1DUOI",
  authDomain: "quiz-website-49162.firebaseapp.com",
  projectId: "quiz-website-49162",
  storageBucket: "quiz-website-49162.firebasestorage.app",
  messagingSenderId: "275275106909",
  appId: "1:275275106909:web:b5ebfb56dbebb6fbcb5bb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
