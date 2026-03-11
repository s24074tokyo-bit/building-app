// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-Pbb9gW-HW6WChpmu5kx53ABGEPPedIk",
  authDomain: "builging-app.firebaseapp.com",
  projectId: "builging-app",
  storageBucket: "builging-app.firebasestorage.app",
  messagingSenderId: "412933774158",
  appId: "1:412933774158:web:6887f282175eea6e8bdc1f",
  measurementId: "G-E42FYEEKSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);