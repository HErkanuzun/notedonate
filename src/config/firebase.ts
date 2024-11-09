import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBPk_2tmSxDRTR4qIdpFcesRPQ4qtoC_nk",
  authDomain: "noteapp-ee00d.firebaseapp.com",
  projectId: "noteapp-ee00d",
  storageBucket: "noteapp-ee00d.appspot.com",
  messagingSenderId: "232815237415",
  appId: "1:232815237415:web:46766400229be02189f102",
  measurementId: "G-KF8EFEZMYN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence for Firestore
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.');
      }
    });
}