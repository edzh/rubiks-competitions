import * as firebase from 'firebase';
import Rebase from 're-base';
import { API_KEY } from './config';

const config = {
  apiKey: API_KEY,
  authDomain: "rubik-s-competitions.firebaseapp.com",
  databaseURL: "https://rubik-s-competitions.firebaseio.com",
  projectId: "rubik-s-competitions",
  storageBucket: "rubik-s-competitions.appspot.com",
  messagingSenderId: "150023894919"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config)
};

const db = firebase.database();
const auth = firebase.auth();
const base = Rebase.createClass(db);
export {
  db,
  auth,
  base,
};
