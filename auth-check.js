// Check if Firebase has been initialized already
if (!firebase.apps.length) {
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
}

// Check if auth is already defined
if (typeof window.auth === 'undefined') {
    window.auth = firebase.auth();
}

// Example of usage in auth-check.js
window.auth.onAuthStateChanged(user => {
    if (user) {
        console.log('User is signed in:', user.email);
    } else {
        console.log('No user is signed in.');
		window.location.href = 'login.html'; // URL of your login page
    }
});
