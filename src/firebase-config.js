import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1WpSkU3S6zt1YXraSfmVB4EMJJ0Nh2Uo",
  authDomain: "fire-vdos.firebaseapp.com",
  projectId: "fire-vdos",
  storageBucket: "fire-vdos.appspot.com",
  messagingSenderId: "312708286044",
  appId: "1:312708286044:web:3b20a7d328b45071fd4899"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const gProvider = new GoogleAuthProvider();
export const db = getFirestore(app);