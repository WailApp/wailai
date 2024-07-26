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

// Get a reference to the auth service
const auth = firebase.auth();

document.getElementById('resend-verification').addEventListener('click', function() {
    const user = firebase.auth().currentUser;

    if (user) {
        user.sendEmailVerification()
            .then(() => {
                document.getElementById('message').innerText = 'Verification link has been sent to your email.';
            })
            .catch(error => {
                document.getElementById('verification-error').innerText = 'Error: ' + error.message;
            });
    } else {
        document.getElementById('verification-error').innerText = 'No user is currently signed in.';
    }
});

document.getElementById('check-verification').addEventListener('click', function() {
    const user = firebase.auth().currentUser;

    if (user) {
        user.reload()
            .then(() => {
                if (user.emailVerified) {
                    document.getElementById('message').innerText = 'Your email has been verified! You can now log in.';
                    // Redirect to login page or main page
                    window.location.href = 'https://wailapp.github.io/wailai/index.html';
                } else {
                    document.getElementById('verification-error').innerText = 'Your email has not been verified yet.';
                }
            })
            .catch(error => {
                document.getElementById('verification-error').innerText = 'Error: ' + error.message;
            });
    } else {
        document.getElementById('verification-error').innerText = 'No user is currently signed in.';
    }
});

document.getElementById('sign-out').addEventListener('click', function() {
    auth.signOut()
        .then(() => {
            // Redirect to login page after signing out
            window.location.href = 'login.html';
        })
        .catch(error => {
            document.getElementById('verification-error').innerText = 'Error: ' + error.message;
        });
});
