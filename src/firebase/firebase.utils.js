// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig ={
  apiKey: "AIzaSyD0nhPIuXZgozRwuJEI3FllPYK4ZxcUKBM",
  authDomain: "crwn-db-6ee2e.firebaseapp.com",
  projectId: "crwn-db-6ee2e",
  storageBucket: "crwn-db-6ee2e.appspot.com",
  messagingSenderId: "60589038929",
  appId: "1:60589038929:web:f20505144ecb60da1a0770",
  measurementId: "G-WFV7W54XP1"
};

// firebase.initializeApp(config);
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth();
auth.languageCode = 'it';
export const firestore = getFirestore(firebase);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebase; 



