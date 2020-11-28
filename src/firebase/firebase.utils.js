import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDWntMxIjjvxO747TE9pwNwpfGYoevS2GI",
  authDomain: "crwn-db-3373d.firebaseapp.com",
  databaseURL: "https://crwn-db-3373d.firebaseio.com",
  projectId: "crwn-db-3373d",
  storageBucket: "crwn-db-3373d.appspot.com",
  messagingSenderId: "730443909402",
  appId: "1:730443909402:web:5dc3b4b25a967c52dcc4a3",
  measurementId: "G-XHD09RR8SK"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.messages);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
