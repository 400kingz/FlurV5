// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS_bvwlMcEBIt7vNBpp0w3DK1aogkgOCE",
  authDomain: "flur-4d9b5.firebaseapp.com",
  projectId: "flur-4d9b5",
  storageBucket: "flur-4d9b5.appspot.com",
  messagingSenderId: "642624518769",
  appId: "1:642624518769:web:a78b2c4034fb599c9679d0",
  measurementId: "G-3ZM1SHGFPY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);