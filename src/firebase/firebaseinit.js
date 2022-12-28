import firebase from "firebase/app";
import "firebase/firestore";

let firebaseConfig = {
  apiKey: "AIzaSyAeFqkVpZxg8nqhXl_8IW74eoaEMtVfIHg",
  authDomain: "fireblogs-b79f7.firebaseapp.com",
  projectId: "fireblogs-b79f7",
  storageBucket: "fireblogs-b79f7.appspot.com",
  messagingSenderId: "320402091621",
  appId: "1:320402091621:web:59e81898249134e3ad608c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
