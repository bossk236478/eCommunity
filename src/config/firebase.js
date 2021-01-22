import * as firebase from 'firebase';
import "firebase/auth";
require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyBERnFTQFvMIGBazvlokzZgGD9IvsBcoyU",
  authDomain: "eticket-14085.firebaseapp.com",
  databaseURL: "https://eticket-14085-default-rtdb.firebaseio.com",
  projectId: "eticket-14085",
  storageBucket: "eticket-14085.appspot.com",
  messagingSenderId: "866557962016",
  appId: "1:866557962016:web:6029c96f482c7326e85945"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore()

export default db;