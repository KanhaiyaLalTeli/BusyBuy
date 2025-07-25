// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createContext, useContext } from "react";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtgxSUCI97SPd52V7cz7w1VmvV51uX6Xc",
  authDomain: "buybusy-36e7c.firebaseapp.com",
  projectId: "buybusy-36e7c",
  storageBucket: "buybusy-36e7c.firebasestorage.app",
  messagingSenderId: "921013152039",
  appId: "1:921013152039:web:d623bf7e1d157d649de102"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;

export const FirebaseAuth= getAuth(FirebaseApp);

export const db = getFirestore(FirebaseApp);



