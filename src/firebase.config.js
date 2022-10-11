// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_xPJy0FdhEnb4cKLPHyjLhjH5HX63cGY",
  authDomain: "house-marketplace-app-96d1d.firebaseapp.com",
  projectId: "house-marketplace-app-96d1d",
  storageBucket: "house-marketplace-app-96d1d.appspot.com",
  messagingSenderId: "972937836771",
  appId: "1:972937836771:web:8eaccb077e1e6f4d686dd6"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()