// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "qwiikorder-c0389.firebaseapp.com",
  projectId: "qwiikorder-c0389",
  storageBucket: "qwiikorder-c0389.firebasestorage.app",
  messagingSenderId: "903954077959",
  appId: "1:903954077959:web:854fe7d3c5f5ce79bf0da2"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig): getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {db,  storage};