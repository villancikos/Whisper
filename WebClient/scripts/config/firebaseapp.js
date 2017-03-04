import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBghW4rGKXMhzjJXPBZIhWmHaYRqpz7AZo",
  authDomain: "pythonwithfirebase-6b00a.firebaseapp.com",
  databaseURL: "https://pythonwithfirebase-6b00a.firebaseio.com",
  storageBucket: "pythonwithfirebase-6b00a.appspot.com",
  messagingSenderId: "740790435984"
};
firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth()