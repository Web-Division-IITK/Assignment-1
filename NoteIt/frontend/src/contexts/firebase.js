import firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDtR1kUBlAroc34Qi19hyPjHeBSqqhI-5o",
    authDomain: "noteit-7b9bc.firebaseapp.com",
    projectId: "noteit-7b9bc",
    storageBucket: "noteit-7b9bc.appspot.com",
    messagingSenderId: "286838997483",
    appId: "1:286838997483:web:8e0059023e273fc96119ae"
  };
  const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;