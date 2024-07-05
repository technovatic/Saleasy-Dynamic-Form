// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-0Pufhs4cEjUsvIlW6LCZla4SZtqM2c8",
    authDomain: "saleasy-79524.firebaseapp.com",
    projectId: "saleasy-79524",
    storageBucket: "saleasy-79524.appspot.com",
    messagingSenderId: "629122387767",
    appId: "1:629122387767:web:9c0a00085dcb9d57b914b2",
    measurementId: "G-ZTVXWHPVQG"
  }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Function to create a new user with email and password
const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("User signed up:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorCode, errorMessage);
    });
};

// Function to sign in a user with email and password
const signInUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User signed in:", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing in:", errorCode, errorMessage);
    });
};

// Export auth and googleProvider for use in other parts of your application
export { auth, googleProvider, createUser, signInUser };
