// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC1PFI0fot4yH54R0Hu1PRaq3YORTziMM",
  authDomain: "mapeandolugares-bcea5.firebaseapp.com",
  projectId: "mapeandolugares-bcea5",
  storageBucket: "mapeandolugares-bcea5.appspot.com",
  messagingSenderId: "786713798591",
  appId: "1:786713798591:web:9cb3c53ddd345f4976630a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};