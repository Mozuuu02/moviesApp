// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBMqYQ4lQhhA3kZg1zYoPa9-dWDIgrK0Kk",
  authDomain: "filmyverse-e002e.firebaseapp.com",
  projectId: "filmyverse-e002e",
  storageBucket: "filmyverse-e002e.appspot.com",
  messagingSenderId: "544683130553",
  appId: "1:544683130553:web:d72d067b26654e5030e568"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesref = collection(db, "movies");
export const reviewref = collection(db, "reviews");
export const usersRef = collection(db, "users");
export default app;