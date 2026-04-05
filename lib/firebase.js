import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCkce5TAoVaIva2htDMrTA_QWpRxSe84AY",
  authDomain: "shophub-d52e9.firebaseapp.com",
  databaseURL: "https://shophub-d52e9-default-rtdb.firebaseio.com",
  projectId: "shophub-d52e9",
  storageBucket: "shophub-d52e9.firebasestorage.app",
  messagingSenderId: "819158685594",
  appId: "1:819158685594:web:d8c219abae97e82c43cc23"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
