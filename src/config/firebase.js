import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRNIT46O0QNIvqBHsCTSAv_BHb6Wf7Suk",
  authDomain: "brown-social.firebaseapp.com",
  databaseURL: "https://brown-social.firebaseio.com",
  projectId: "brown-social",
  storageBucket: "brown-social.appspot.com",
  messagingSenderId: "382693883126",
  appId: "1:382693883126:web:a922436c1b21c09bcd40d7",
  measurementId: "G-M60HQHYKX9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const projectAuth = firebase.auth();
export const projectStorage = firebase.storage();
export const projectFirestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
