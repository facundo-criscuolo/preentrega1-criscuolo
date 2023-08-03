import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBg_4cFNJ3x21KYl2b1AmpecwdqmycR1s",
  authDomain: "vite-project-1682e.firebaseapp.com",
  projectId: "vite-project-1682e",
  storageBucket: "vite-project-1682e.appspot.com",
  messagingSenderId: "665468433299",
  appId: "1:665468433299:web:25be7cee059aa4d01e6e66",
  measurementId: "G-0LRBWGTGBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
