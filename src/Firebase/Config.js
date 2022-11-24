import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCDMM6EQWo3_Lm3-t3bNGPp_lI8ptOb5vM",
    authDomain: "quize-task.firebaseapp.com",
    projectId: "quize-task",
    storageBucket: "quize-task.appspot.com",
    messagingSenderId: "552401352534",
    appId: "1:552401352534:web:6d4c7d966562dea72cc8f7"
};

// init firebase

firebase.initializeApp(firebaseConfig)

// init service
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { projectFirestore, projectAuth, provider }