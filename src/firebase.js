import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCej4oR0Z006xRQSLOPvEYovaSp_aBpQSA",
  authDomain: "ecomapp-48c0a.firebaseapp.com",
  projectId: "ecomapp-48c0a",
  storageBucket: "ecomapp-48c0a.appspot.com",
  messagingSenderId: "256397638790",
  appId: "1:256397638790:web:10ddd19501747d1842e507",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
