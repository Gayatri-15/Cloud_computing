import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyApklNSIdrvo9zx2S6hCiy9D5lZPBrgJiU",
  authDomain: "login-form-30d10.firebaseapp.com",
  projectId: "login-form-30d10",
  storageBucket: "login-form-30d10.firebasestorage.app",
  messagingSenderId: "1033719257662",
  appId: "1:1033719257662:web:1620186112d58fffb48f6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUser");
  const docRef = doc(db, "users", loggedInUserId);
  getDoc(docRef)
    .then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        document.getElementById("loggeduserfname").innerHTML =
          userData.firstName;
        document.getElementById("loggeduserlname").innerHTML =
          userData.lastName;
        document.getElementById("loggeduseremail").innerHTML = userData.email;
      }
    })

    .catch((error) => console.log(error));
});

document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    signOut(auth)
    .then(() => {
        alert('signed out successfully');
        window.location.href = "index.html";
    })
    .catch((error) => console.log('error signing out',error));
})