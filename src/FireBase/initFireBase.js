import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/database"
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyDkToRZXcJaDgiiGa626y_D4Sux5RDDnzI",
    authDomain: "the-final-project-84100.firebaseapp.com",
    projectId: "the-final-project-84100",
    storageBucket: "the-final-project-84100.appspot.com",
    messagingSenderId: "282940254762",
    appId: "1:282940254762:web:f85b138483f19aec2db153",
  };

const initFireBase = () => {
        firebase.initializeApp(config)
};
initFireBase();

export {firebase};
