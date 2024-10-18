// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,  GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATF64gA1sEf7zDV3jHlmeo2X9nXwHRfXU",
  authDomain: "meet-app-1442c.firebaseapp.com",
  projectId: "meet-app-1442c",
  storageBucket: "meet-app-1442c.appspot.com",
  messagingSenderId: "1042763076359",
  appId: "1:1042763076359:web:4640790d0a7ce9c26e2ba2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);