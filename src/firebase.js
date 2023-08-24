import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const API_KEY = import.meta.env.VITE_APP_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "myfavoritproduct.firebaseapp.com",
  projectId: "myfavoritproduct",
  storageBucket: "myfavoritproduct.appspot.com",
  messagingSenderId: "871850347649",
  appId: "1:871850347649:web:feaa65bac461fc70925180"
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();


