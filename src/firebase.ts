import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyBjboMH-rwsiD1PsG-LrlQWx-6-Fa_p96M",
  authDomain: "reveal-clues-quiz.firebaseapp.com",
  projectId: "reveal-clues-quiz",
  storageBucket: "reveal-clues-quiz.appspot.com",
  messagingSenderId: "74030913512",
  appId: "1:74030913512:web:91fdf6941e3ce3abf0365d"
});
//TODO: Should I move all this to a single class or smth?
export const databaseRef = getFirestore(app);
export const firebaseAuth = getAuth(app);