import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import { initializeApp } from "firebase/app";

initializeApp({
  apiKey: "AIzaSyBjboMH-rwsiD1PsG-LrlQWx-6-Fa_p96M",
  authDomain: "reveal-clues-quiz.firebaseapp.com",
  projectId: "reveal-clues-quiz",
  storageBucket: "reveal-clues-quiz.appspot.com",
  messagingSenderId: "74030913512",
  appId: "1:74030913512:web:91fdf6941e3ce3abf0365d"
});

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
