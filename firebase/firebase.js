import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgKidms_Cl1l2wgcCU6Vk_ictb9GuUyxo",
  authDomain: "fir-todo-63942.firebaseapp.com",
  projectId: "fir-todo-63942",
  storageBucket: "fir-todo-63942.appspot.com",
  messagingSenderId: "530465673778",
  appId: "1:530465673778:web:9e2cdb37f1525adb9d222b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
