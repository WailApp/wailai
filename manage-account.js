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

// Get references to services
const auth = firebase.auth();
const firestore = firebase.firestore();

document.getElementById('update-profile-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const displayName = document.getElementById('display-name').value;
    const photoURL = document.getElementById('photo-url').value;
    const user = auth.currentUser;

    if (user) {
        user.updateProfile({
            displayName: displayName,
            photoURL: photoURL
        })
        .then(() => {
            document.getElementById('message').innerText = 'Profile updated successfully!';
        })
        .catch(error => {
            document.getElementById('error-message').innerText = 'Error: ' + error.message;
        });
    } else {
        document.getElementById('error-message').innerText = 'No user is currently signed in.';
    }
});

document.getElementById('enable-security').addEventListener('click', function() {
    const user = auth.currentUser;

    if (user) {
        // Here you can enable specific security features like two-factor authentication or other settings
        document.getElementById('message').innerText = 'Account protection feature is not yet implemented.';
    } else {
        document.getElementById('error-message').innerText = 'No user is currently signed in.';
    }
});

document.getElementById('manage-mfa').addEventListener('click', function() {
    const user = auth.currentUser;

    if (user) {
        // Use Firebase Multi-Factor Authentication methods
        if (user.multiFactor.enrolledFactors.length > 0) {
            // User has enrolled MFA factors
            document.getElementById('message').innerText = 'Two-step verification is already enabled.';
        } else {
            // Redirect to a page for enrolling MFA
            window.location.href = 'mfa-setup.html';
        }
    } else {
        document.getElementById('error-message').innerText = 'No user is currently signed in.';
    }
});

document.getElementById('delete-account').addEventListener('click', function() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        const user = auth.currentUser;

        if (user) {
            user.delete()
                .then(() => {
                    document.getElementById('message').innerText = 'Account deleted successfully.';
                    // Redirect to login page or home page after deletion
                    window.location.href = 'login.html';
                })
                .catch(error => {
                    document.getElementById('error-message').innerText = 'Error: ' + error.message;
                });
        } else {
            document.getElementById('error-message').innerText = 'No user is currently signed in.';
        }
    }
});
