// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY as string,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
  databaseURL: import.meta.env.VITE_DATABASE_URL as string,
  projectId: import.meta.env.VITE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_APP_ID as string,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID as string,
};

// const firebaseConfig = {
//   apiKey: "AIzaSyAUcZ7oWo0zi1DUpv2mu2uaY-nXvrPqYAs",
//   authDomain: "aquaculture-e24d3.firebaseapp.com",
//   databaseURL: "https://aquaculture-e24d3-default-rtdb.firebaseio.com",
//   projectId: "aquaculture-e24d3",
//   storageBucket: "aquaculture-e24d3.firebasestorage.app",
//   messagingSenderId: "64287061608",
//   appId: "1:64287061608:web:54fe6655894d57734e6ddd",
//   measurementId: "G-TLVEPDYBQ1",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, analytics, database };
