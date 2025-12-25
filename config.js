import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-analytics.js";
import {  getFirestore, setDoc,orderBy, onSnapshot, deleteField, updateDoc, getDocs, doc, getDoc, collection, query, where, arrayUnion, arrayRemove ,addDoc, serverTimestamp} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; 
  const firebaseConfig = {
     apiKey: "AIzaSyAJkUFC-_kJ9z2GlGPlZTjG-6UHI7w7QOI",
    authDomain: "facebook-c-5fc57.firebaseapp.com",
    projectId: "facebook-c-5fc57",
    storageBucket: "facebook-c-5fc57.firebasestorage.app",
    messagingSenderId: "989913169900",
    appId: "1:989913169900:web:19ba42645388f9ff910ac9",
    measurementId: "G-01CKYSEPK4"
  };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setDoc,
    doc,
    db,
    where,
    collection,
    query,
    getDocs,
    arrayUnion,
    getDoc,
    updateDoc,
    deleteField,
    arrayRemove,
    addDoc,
    orderBy,
     serverTimestamp,
     onSnapshot,
};