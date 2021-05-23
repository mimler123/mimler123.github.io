import firebaseApp from "firebase/app";
import firebaseAuth from "firebase/auth";
//import firebaseDb from "firebase/database";
import firebaseFirestore from "firebase/firestore";

var config = {
  apiKey: "AIzaSyBHroR7QPodDaLtaCJhLi9jijA7A0WWl64",
  authDomain: "deepwoken-map-9f90e.firebaseapp.com",
  projectId: "deepwoken-map-9f90e",
  storageBucket: "deepwoken-map-9f90e.appspot.com",
  messagingSenderId: "651547098490",
  appId: "1:651547098490:web:be4703545e81aec662eac3",
  measurementId: "G-ELMHDJG3L3",
};

var firebase = firebaseApp.initializeApp(config);
var provider = new firebaseApp.auth.GoogleAuthProvider();

export { provider };

export default firebase;
