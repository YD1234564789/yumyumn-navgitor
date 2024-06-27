// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClDNw5jqW5p8MBp7gvyy4gKa7v7Qmw-tI",
  authDomain: "react-auth-48ba5.firebaseapp.com",
  projectId: "react-auth-48ba5",
  storageBucket: "react-auth-48ba5.appspot.com",
  messagingSenderId: "785400352035",
  appId: "1:785400352035:web:d6780279b1a6772fc75096"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const googleAuth = getAuth(app)

export const provider = new GoogleAuthProvider()