import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBk6ZYoRPNhY5XIt8kwf74G82mJnGqG_fk",
  authDomain: "react-native-instagram-aef73.firebaseapp.com",
  databaseURL: "https://react-native-instagram-aef73.firebaseio.com",
  projectId: "react-native-instagram-aef73",
  storageBucket: "react-native-instagram-aef73.appspot.com",
  messagingSenderId: "413897115929",
  appId: "1:413897115929:web:3c3186af1ea19f95f3dd88",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, firestore, storage };
