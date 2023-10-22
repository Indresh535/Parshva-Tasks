// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "portfolio-862b0.firebaseapp.com",
  databaseURL: "https://portfolio-862b0-default-rtdb.firebaseio.com",
  projectId: "portfolio-862b0",
  storageBucket: "portfolio-862b0.appspot.com",
  messagingSenderId: "425303968410",
  appId: "1:425303968410:web:d1a7a02aac21db08e16d23"
};

// Initialize Firebase
const FireBaseApp = initializeApp(firebaseConfig);
const FireBaseDB = getFirestore(FireBaseApp);

export {FireBaseDB}