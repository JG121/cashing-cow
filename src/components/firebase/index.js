// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaaU5Tpn5EbV7fqtBqpQNUU1GHRukZioY",
  authDomain: "cashing-cow-nextjs.firebaseapp.com",
  databaseURL: "https://cashing-cow-nextjs-default-rtdb.firebaseio.com",
  projectId: "cashing-cow-nextjs",
  storageBucket: "cashing-cow-nextjs.appspot.com",
  messagingSenderId: "509321054872",
  appId: "1:509321054872:web:4fb95ccead37fbc87d1eed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}