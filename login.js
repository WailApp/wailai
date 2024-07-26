// Firebase configuration
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
firebase.initializeApp(firebaseConfig);

// Get reference to auth service
const auth = firebase.auth();

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Check if 2SV is enabled
            const user = userCredential.user;
            if (user.multiFactor.enrolledFactors.length > 0) {
                // Redirect to 2SV verification page
                window.location.href = 'two-step-verification.html';
            } else {
                // Redirect to the main page or dashboard
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            document.getElementById('login-error').innerText = 'Error: ' + error.message;
        });
});
