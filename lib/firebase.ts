// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmt5iqY1aFplRipVdRmu_NJ5BQ6r2CPZc",
  authDomain: "studysync-c9afe.firebaseapp.com",
  projectId: "studysync-c9afe",
  storageBucket: "studysync-c9afe.firebasestorage.app",
  messagingSenderId: "418937300069",
  appId: "1:418937300069:web:44cd21908ec52a93de528c"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };