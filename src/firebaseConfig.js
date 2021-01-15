import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyB6WpdVeL0G8loxm1wHl69w4ieVYQlliNA",
  projectId: "whotkey-dc267",
  databaseURL: "https://whotkey-dc267-default-rtdb.firebaseio.com/",
  authDomain: "whotkey-dc267.firebaseapp.com",
  storageBucket: "whotkey-dc267.appspot.com",
  messagingSenderId: "94779464227",
  appId: "1:94779464227:web:9e4d168e6089979e842f96",
  measurementId: "G-MEE6TE97T7"
}

const firebaseApp = firebase.initializeApp( config )

// const database = firebase.database()

export default firebaseApp