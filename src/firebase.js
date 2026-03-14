// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// IMPORTANT: Replace this with actual Firebase config before going live!
export const firebaseConfig = {
  apiKey: "AIzaSyALV3b5Id-M02FL4iv-b0_e4RKUCx7nBo4",
  authDomain: "pro-mrs-akinnibosun-birthday.firebaseapp.com",
  databaseURL: "https://pro-mrs-akinnibosun-birthday-default-rtdb.firebaseio.com",
  projectId: "pro-mrs-akinnibosun-birthday",
  storageBucket: "pro-mrs-akinnibosun-birthday.firebasestorage.app",
  messagingSenderId: "785305991226",
  appId: "1:785305991226:web:e0cfd63c4433db734bdd03",
  measurementId: "G-FB3PP90JG7"
};

export const isDummyConfig = firebaseConfig.apiKey === "YOUR_API_KEY";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
