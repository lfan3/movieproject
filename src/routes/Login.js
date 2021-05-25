import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import '../css/Login.css'

var firebaseConfig = {
    apiKey: "AIzaSyBc_06txs3ZgPG-7aBP2a_vI8CGXlY6VMc",
    authDomain: "hypertube-21bdf.firebaseapp.com",
    projectId: "hypertube-21bdf",
    storageBucket: "hypertube-21bdf.appspot.com",
    messagingSenderId: "846145461352",
    appId: "1:846145461352:web:645f5ce77c013f9aef2fdd",
    measurementId: "G-6RWXQP2VHB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("Auth been called")
 
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};
 
class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>Hypertube</h1>
        <p> Login </p>
        {/* <StyledFirebaseAuth uiCallback={ui => ui.disableAutoSignIn()} uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/> */}

        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

export {Login};