import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyA-noSnWjpm94oGMe4-7MySj3N6k6x3aVY",
    authDomain: "chirolist-167717.firebaseapp.com",
    databaseURL: "https://chirolist-167717.firebaseio.com",
    projectId: "chirolist-167717",
    storageBucket: "chirolist-167717.appspot.com",
    messagingSenderId: "966761048325",
    appId: "1:966761048325:web:9dc21a3c02496ac7902f6c"
  })
}

export default firebase
