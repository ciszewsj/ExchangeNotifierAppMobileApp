import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCQXMppxVkGmj8amuNE0zCZTL_ya_rfOmk",
    authDomain: "exchangenotifierapp.firebaseapp.com",
    databaseURL: "https://exchangenotifierapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "exchangenotifierapp",
    storageBucket: "exchangenotifierapp.appspot.com",
    messagingSenderId: "376893543666",
    appId: "1:376893543666:web:feb2ddcabf4fb175206c6b",
    measurementId: "G-1J8P9XSDDJ"
};

let app;

if (firebase.getApps().length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.getApp();
}

export {app}

const auth = getAuth(app)

export {auth}


const firestore = getFirestore(app)
export {firestore}

export const USER_SETTINGS = "USERS_SETTINGS"
