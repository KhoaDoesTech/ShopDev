// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "shop-app-1b132.firebaseapp.com",
  projectId: "shop-app-1b132",
  storageBucket: "shop-app-1b132.appspot.com",
  messagingSenderId: "453984688323",
  appId: "1:453984688323:web:65d9d61e94f393fef6aa76",
  measurementId: "G-KKL30K0DVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;