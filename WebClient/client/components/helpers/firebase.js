import firebase from 'firebase'

const config_dev = {
  apiKey: 'AIzaSyBghW4rGKXMhzjJXPBZIhWmHaYRqpz7AZo',
  authDomain: 'pythonwithfirebase-6b00a.firebaseapp.com',
  databaseURL: 'https://pythonwithfirebase-6b00a.firebaseio.com',
  storageBucket: 'pythonwithfirebase-6b00a.appspot.com',
  messagingSenderId: '740790435984'
};

const config = {
  apiKey: "AIzaSyAFKtYVz2RxyeZsPKSfF1uA1DVBYt-aG5U",
  authDomain: "whisper-f225b.firebaseapp.com",
  databaseURL: "https://whisper-f225b.firebaseio.com",
  storageBucket: "whisper-f225b.appspot.com",
  messagingSenderId: "241417745514"
};

 const confignico = {
    apiKey: "AIzaSyD0sTBQHOjF9qhb09i8bFNnVcyum_jJJ-Q",
    authDomain: "whispermariya-48e27.firebaseapp.com",
    databaseURL: "https://whispermariya-48e27.firebaseio.com",
    storageBucket: "whispermariya-48e27.appspot.com",
    messagingSenderId: "167687328797"
  };

firebase.initializeApp(config);
export const fAuth = firebase.auth();
export const ref = firebase.database().ref();