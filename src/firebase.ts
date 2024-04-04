// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlpfahAFPVLtfK3n7_2UDYLBJQe7te_tk",
    authDomain: "test1-9090c.firebaseapp.com",
    databaseURL: "https://test1-9090c-default-rtdb.firebaseio.com",
    projectId: "test1-9090c",
    storageBucket: "test1-9090c.appspot.com",
    messagingSenderId: "84442152360",
    appId: "1:84442152360:web:d058446ae65ab89362b19d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }