import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";

const API_KEY = import.meta.env.VITE_APP_KEY;

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "favoriteproduct-f0954.firebaseapp.com",
  projectId: "favoriteproduct-f0954",
  storageBucket: "favoriteproduct-f0954.appspot.com",
  messagingSenderId: "382324806167",
  appId: "1:382324806167:web:779352dc402126af3ac252"
};


export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
