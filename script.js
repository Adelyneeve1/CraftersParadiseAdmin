import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCdp-AWmi1GrcrCYrEcog6rfhRygrt0uRc",
  authDomain: "craftersparadise-8c962.firebaseapp.com",
  projectId: "craftersparadise-8c962",
  storageBucket: "craftersparadise-8c962.appspot.com",
  messagingSenderId: "419818070255",
  appId: "1:419818070255:web:434b87d32020bf3aa67b1a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Toggle password visibility
function togglePassword() {
  const pwd = document.getElementById("password");
  pwd.type = pwd.type === "password" ? "text" : "password";
}

// Login function
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please fill in both fields.");
    return;
  }

  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Check if the user is an admin
    const adminDoc = await db.collection("admins").doc(user.uid).get();
    if (!adminDoc.exists) {
      alert("Access denied: You are not authorized as an admin.");
      await auth.signOut();
      return;
    }

    localStorage.setItem("adminId", user.uid);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login error: " + error.message);
  }
}
