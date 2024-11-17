// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
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

// Initialize Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
