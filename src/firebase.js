import firebase from "firebase";
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBXVuEOlAvOT4LSRk9i9T3tdJV_VkG5S_8",
  authDomain: "decode-firebase-worshop-mj.firebaseapp.com",
  databaseURL: "https://decode-firebase-worshop-mj.firebaseio.com",
  projectId: "decode-firebase-worshop-mj",
  storageBucket: "decode-firebase-worshop-mj.appspot.com",
  messagingSenderId: "117461326644",
};
firebase.initializeApp(config);

export var database = firebase.database();
