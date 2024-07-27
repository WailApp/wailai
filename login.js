import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzg4PmFoXnS95TXk8FlG9C4bSxhfer86E",
    authDomain: "wailai-a.firebaseapp.com",
    projectId: "wailai-a",
    storageBucket: "wailai-a.appspot.com",
    messagingSenderId: "857204915249",
    appId: "1:857204915249:web:0141c2e2e68ed96769e910",
    measurementId: "G-VRR62LMMMK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;
            
            // Example Firestore usage: Add a new document to a "devices" collection
            try {
                await addDoc(collection(db, "devices"), {
                    userId: user.uid,
                    timestamp: new Date(),
                    device: navigator.userAgent, // You can add more device info here
                    location: "User's location" // Replace with real location data if available
                });
                console.log("Device info added to Firestore");
            } catch (e) {
                console.error("Error adding document: ", e);
            }

            // Redirect user or show appropriate message
            window.location.href = 'index.html';
        })
        .catch((error) => {
            document.getElementById('login-error').innerText = 'Error: ' + error.message;
        });
});
