// firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXS1CL1dqgTnn4vTVwRNiIYq_l_w6kyWU",
  authDomain: "dentondevelopers.firebaseapp.com",
  projectId: "dentondevelopers",
  storageBucket: "dentondevelopers.firebasestorage.app",
  messagingSenderId: "341357377717",
  appId: "1:341357377717:web:e3e4d734c9843239c766fc",
  measurementId: "G-7D2E15GTJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);