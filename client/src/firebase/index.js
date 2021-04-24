 import firebase from 'firebase/app'
 import 'firebase/storage';

 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAaPJK9b70zO2FLE1h3thlN7Kt-sji9y9M",
    authDomain: "turf-booking-project-b7b39.firebaseapp.com",
    projectId: "turf-booking-project-b7b39",
    storageBucket: "turf-booking-project-b7b39.appspot.com",
    messagingSenderId: "548749574866",
    appId: "1:548749574866:web:0d09ac24e8eccf1394a30b",
    measurementId: "G-XJTFQS5MB3"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  const storage = firebase.storage()

  export {
      storage, firebase as default
  }
