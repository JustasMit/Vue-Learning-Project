import firebase from "firebase/app";
import "firebase/firestore";
import apikey from "./apikey";

var firebaseKey = apikey.MY_KEY;

var firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "todo-1adb5.firebaseapp.com",
  databaseURL: "https://todo-1adb5.firebaseio.com",
  projectId: "todo-1adb5",
  storageBucket: "todo-1adb5.appspot.com",
  messagingSenderId: "221647984947",
  appId: "1:221647984947:web:86a8af8ac3d5b0b1638646",
  measurementId: "G-RQ7MZZ4ZHP"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default firestore;
