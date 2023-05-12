import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA9CqhUWm9ujVxDGLktFidg9UQSO88lQ6Q",
  authDomain: "testebancoreact.firebaseapp.com",
  projectId: "testebancoreact",
  storageBucket: "testebancoreact.appspot.com",
  messagingSenderId: "560783419240",
  appId: "1:560783419240:web:40b56916def2c94df998dd",
  measurementId: "G-6RFRRRBY0Y"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);