import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from "firebase/compat/app";
const firebaseConfig = {
  apiKey: "AIzaSyD8jXn4RP9CVIXg_T4B-4x8iGoQSjwrR88",
  authDomain: "andela-neo-sandbox.firebaseapp.com",
  projectId: "andela-neo-sandbox",
  storageBucket: "andela-neo-sandbox.appspot.com",
  messagingSenderId: "1039823961304",
  appId: "1:1039823961304:web:ffdfa5e715355995d36bad",
  measurementId: "G-FG1V7Q3LW3",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(`Firebase ${app.name} initialized`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
