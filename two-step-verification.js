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

document.getElementById('send-code-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email-address').value;

    auth.sendSignInLinkToEmail(email, {
        url: 'https://yourdomain.com/completeSignUp', // URL to redirect after email verification
        handleCodeInApp: true
    })
    .then(() => {
        // Save the email locally to complete sign-up later
        window.localStorage.setItem('emailForSignIn', email);
        document.getElementById('send-code-form').style.display = 'none';
        document.getElementById('verify-form').style.display = 'block';
        document.getElementById('message').innerText = 'Verification email sent!';
    })
    .catch(error => {
        document.getElementById('error-message').innerText = 'Error: ' + error.message;
    });
});

document.getElementById('verify-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const verificationCode = document.getElementById('verification-code').value;

    // Fetch email stored in local storage
    const email = window.localStorage.getItem('emailForSignIn');

    if (email) {
        auth.signInWithEmailLink(email, window.location.href)
        .then(result => {
            // Clear local storage
            window.localStorage.removeItem('emailForSignIn');
            // Verification successful
            document.getElementById('message').innerText = 'Verification successful!';
            // Redirect to the main page or dashboard
            window.location.href = 'dashboard.html';
        })
        .catch(error => {
            document.getElementById('error-message').innerText = 'Error: ' + error.message;
        });
    } else {
        document.getElementById('error-message').innerText = 'No verification process found.';
    }
});