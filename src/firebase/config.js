import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQTPN7Cnc9nH4hK3fiEf4BMiAeGFkky4o",
  authDomain: "proligz.firebaseapp.com",
  projectId: "proligz",
  storageBucket: "proligz.appspot.com",
  messagingSenderId: "883005056057",
  appId: "1:883005056057:web:0cce7b4b1fc49e337999e8",
};

// init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, projectStorage, timestamp };
