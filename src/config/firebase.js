const firebase = require("firebase/app");
const admin = require('firebase-admin');
const { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  sendPasswordResetEmail
} = require("firebase/auth");


// Use require to load the service account JSON file
//hamza
//const serviceAccount = require("C:\\Users\\GT\\Desktop\\rmts-web\\firebaseservice.json"); // Update with the correct path to your firebaseservice.json file
//ahmed
const serviceAccount = require("C:\\Users\\97155\\Desktop\\RMTHAMZACODE\\Draft one\\Firebase-authentication-Express.js-main\\firebaseservice.json"); // Update with the correct path to your firebaseservice.json file

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Firebase client config
const firebaseConfig = {
  apiKey: "AIzaSyB7Xkl5IVT7Z-nFuFaHjd1H0RILvyHITVQ",
  authDomain: "rmts-8f76b.firebaseapp.com",
  projectId: "rmts-8f76b",
  storageBucket: "rmts-8f76b.appspot.com",
  messagingSenderId: "890480272228",
  appId: "1:890480272228:web:e78e6adc4132343a30d071",
  measurementId: "G-5X3BK2CFFE",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  admin
};
