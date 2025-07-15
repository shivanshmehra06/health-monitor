// js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOM_spILQCHct54yzNHWIVsZRdT4xCVfc",
  authDomain: "health-monitor-f5b96.firebaseapp.com",
  databaseURL: "https://health-monitor-f5b96-default-rtdb.firebaseio.com",
  projectId: "health-monitor-f5b96",
  storageBucket: "health-monitor-f5b96.appspot.com",
  messagingSenderId: "84125754587",
  appId: "1:84125754587:web:6f0df57f57afe0931918fe",
  measurementId: "G-51BM0EWG55"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);