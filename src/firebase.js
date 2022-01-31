import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzlvzVaPlg2592lHO1x2jCSF3BnqZ9ff8",
  authDomain: "whatsapp-cc89e.firebaseapp.com",
  projectId: "whatsapp-cc89e",
  storageBucket: "whatsapp-cc89e.appspot.com",
  messagingSenderId: "966328082685",
  appId: "1:966328082685:web:3da675953cd9acbdaa9e94"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider()

export {auth,provider};
export default db;