import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASxnIRMMht8KWM3tB7V4MZNsWFvtbXuRQ",
  authDomain: "socialmediaposts-a51be.firebaseapp.com",
  projectId: "socialmediaposts-a51be",
  storageBucket: "socialmediaposts-a51be.appspot.com",
  messagingSenderId: "347829250357",
  appId: "1:347829250357:web:b0aab247e6b19f7b04447c",
  measurementId: "G-62KQT1MEK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Cloud Storage
const storage = getStorage(app);

export { app, db, auth, storage };
