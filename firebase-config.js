// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWXpY7U38LfuyoGOv6jAaRMuDwrwL1uyY",
  authDomain: "student-gig.firebaseapp.com",
  projectId: "student-gig",
  storageBucket: "student-gig.firebasestorage.app",
  messagingSenderId: "701569741185",
  appId: "1:701569741185:web:b1cd1a6e1bca17384d3880",
  measurementId: "G-R1V20W5Q5S"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // For Cloud Firestore
