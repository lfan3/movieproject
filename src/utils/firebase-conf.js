// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";


//??
export const AuthFireBase = ()=>{

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
}
