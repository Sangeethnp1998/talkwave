const { initializeApp } = require ("firebase/app");
const { getStorage} = require('firebase/storage');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC92NBzDEPUZiVj7vm8j-ptBq887Vf4Ax4",
  authDomain: "talkwave-9fe67.firebaseapp.com",
  projectId: "talkwave-9fe67",
  storageBucket: "talkwave-9fe67.appspot.com",
  messagingSenderId: "821480375840",
  appId: "1:821480375840:web:1cb5ff9d451745b9a01e45",
  measurementId: "G-ZPFQNBZKEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
module.exports = getStorage(app);