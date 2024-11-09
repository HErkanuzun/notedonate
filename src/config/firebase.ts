import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBPk_2tmSxDRTR4qIdpFcesRPQ4qtoC_nk",
  authDomain: "noteapp-ee00d.firebaseapp.com",
  projectId: "noteapp-ee00d",
  storageBucket: "noteapp-ee00d.firebasestorage.app",
  messagingSenderId: "232815237415",
  appId: "1:232815237415:web:46766400229be02189f102",
  measurementId: "G-KF8EFEZMYN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence for authentication
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Auth persistence error:", error);
});

// Enable offline persistence for Firestore
enableIndexedDbPersistence(db, {
  forceOwnership: true
}).catch((error) => {
  if (error.code === 'failed-precondition') {
    console.warn(
      'Firestore persistence could not be enabled. Multiple tabs open.'
    );
  } else if (error.code === 'unimplemented') {
    console.warn(
      'Browser does not support IndexedDB persistence.'
    );
  }
});