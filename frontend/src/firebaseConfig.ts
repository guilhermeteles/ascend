// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyP_vhGaWQPVRiJbFlAwjXeUZSOxroJ0I",
  authDomain: "ascend-6b8e5.firebaseapp.com",
  projectId: "ascend-6b8e5",
  storageBucket: "ascend-6b8e5.firebasestorage.app",
  messagingSenderId: "68577751613",
  appId: "1:68577751613:web:15fc56f8a10348d3803054",
  measurementId: "G-MBHSVZM9EW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);