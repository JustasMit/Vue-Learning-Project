import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "todo-43d6c.firebaseapp.com",
  databaseURL: "https://todo-43d6c.firebaseio.com",
  projectId: "todo-43d6c",
  storageBucket: "todo-43d6c.appspot.com",
  messagingSenderId: "805147175515",
  appId: "1:805147175515:web:70d53194acc3d338876d7e",
  measurementId: "G-CH3QJ9E1LY"
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default firestore;
