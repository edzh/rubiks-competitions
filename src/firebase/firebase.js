import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBQaCrXf4ZyPmHXDSCqvkQGB9GmpurEWjw",
  authDomain: "rubik-s-competitions.firebaseapp.com",
  databaseURL: "https://rubik-s-competitions.firebaseio.com",
  projectId: "rubik-s-competitions",
  storageBucket: "rubik-s-competitions.appspot.com",
  messagingSenderId: "150023894919"
};

!firebase.apps.length ? firebase.initializeApp(config);

const auth = firebase.auth();

export {
  auth,
};
