import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "database";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCwih2UMplvRm_SKCrS0OsBDCnl7SiZTr0",
  authDomain: "auth-development-8c6a4.firebaseapp.com",
  projectId: "auth-development-8c6a4",
  storageBucket: "auth-development-8c6a4.appspot.com",
  messagingSenderId: "233474378799",
  appId: "1:233474378799:web:bdf240d58f44cb9f7a0ada",
});

export const auth = app.auth();

export default app;

export const db = getFirestore(app);
