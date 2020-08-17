import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBA716luhEg4EvSbfhfgAgBuFiFQcfZVq8",
  authDomain: "dev-blog-7b606.firebaseapp.com",
  databaseURL: "https://dev-blog-7b606.firebaseio.com",
  projectId: "dev-blog-7b606",
  storageBucket: "dev-blog-7b606.appspot.com",
  messagingSenderId: "1003473602417",
  appId: "1:1003473602417:web:fa1e55605d3918b42ad8d0",
  measurementId: "G-ZB7Q585NZM"
};

firebase.initializeApp(firebaseConfig);

// Firebase Authentication
export const firebaseAuthentication = firebase.auth()

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
export const GitHubProvider = new firebase.auth.GithubAuthProvider()

export { firebase }

// Firebase Cloud Firestore
export const firebaseDatabase = firebase.firestore()

// Firebase Storage
export const storage = firebase.storage()
