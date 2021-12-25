// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig ={
  apiKey: "AIzaSyD0nhPIuXZgozRwuJEI3FllPYK4ZxcUKBM",
  authDomain: "crwn-db-6ee2e.firebaseapp.com",
  projectId: "crwn-db-6ee2e",
  storageBucket: "crwn-db-6ee2e.appspot.com",
  messagingSenderId: "60589038929",
  appId: "1:60589038929:web:f20505144ecb60da1a0770",
  measurementId: "G-WFV7W54XP1"
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth) return; 
  // const userRef = doc(firestoredb, 'users/128fdashadu');
  // const snapShot = await getDoc(userRef);
  // console.log(snapShot)

  const userRef = doc(firestoredb, `users/${userAuth.uid}`);
  const snapshot = await getDoc(userRef);
  // console.log(snapshot);
  if (!snapshot.exists()) {
    const { displayName, email } = userAuth; 
    const createdAt = new Date();
    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef;
}
const firebase = initializeApp(firebaseConfig);


export const auth = getAuth();
// export const authstate = onAuthStateChanged();
auth.languageCode = 'it';
export const firestoredb = getFirestore(firebase);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebase; 



