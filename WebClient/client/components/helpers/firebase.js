import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAFKtYVz2RxyeZsPKSfF1uA1DVBYt-aG5U",
  authDomain: "whisper-f225b.firebaseapp.com",
  databaseURL: "https://whisper-f225b.firebaseio.com",
  storageBucket: "whisper-f225b.appspot.com",
  messagingSenderId: "241417745514"
};

firebase.initializeApp(config);
export const fAuth = firebase.auth();
export const ref = firebase.database().ref();