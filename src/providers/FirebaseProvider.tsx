// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY as string,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN as string,
//   databaseURL: import.meta.env.VITE_DATABASE_URL as string,
//   projectId: import.meta.env.VITE_PROJECT_ID as string,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET as string,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID as string,
//   appId: import.meta.env.VITE_APP_ID as string,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID as string,
// };

const firebaseConfig = {
  apiKey: "AIzaSyCr2dSX8mDfik1nVA95RL0YQnY1UDLNXxU",
  authDomain: "aquaculture-34b16.firebaseapp.com",
  projectId: "aquaculture-34b16",
  storageBucket: "aquaculture-34b16.appspot.com",
  messagingSenderId: "621314185616",
  appId: "1:621314185616:web:dca609e4c40aa946c4fb15",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
