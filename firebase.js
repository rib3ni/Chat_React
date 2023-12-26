// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC11yVXZbKHTqtkdWcBS6pkEsTkAd7QhlI",
    authDomain: "nova-cd710.firebaseapp.com",
    projectId: "nova-cd710",
    storageBucket: "nova-cd710.appspot.com",
    messagingSenderId: "948753557010",
    appId: "1:948753557010:web:68ccd2abc74dd76ae5dacb",
    measurementId: "G-XEW6EJH4XQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app}