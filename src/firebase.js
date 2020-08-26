import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBpbZXR2NzYouAH7d09crxX0HOP8dSEIAw",
    authDomain: "whatsapp-clone-6891c.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-6891c.firebaseio.com",
    projectId: "whatsapp-clone-6891c",
    storageBucket: "whatsapp-clone-6891c.appspot.com",
    messagingSenderId: "708924234025",
    appId: "1:708924234025:web:a42640396380edbf517f38",
    measurementId: "G-6BT34EK5KV"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  export const auth=firebase.auth();
  export const provider=new firebase.auth.GoogleAuthProvider();

  export default db;
  