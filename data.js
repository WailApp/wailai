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

// Get reference to auth service and Firestore
const auth = firebase.auth();
const firestore = firebase.firestore();

// Get device and browser information
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const browserName = navigator.appName;
    const browserVersion = navigator.appVersion;
    const platform = navigator.platform;
    const language = navigator.language;
    return {
        userAgent,
        browserName,
        browserVersion,
        platform,
        language
    };
}

// Get location information using IPinfo API (replace YOUR_TOKEN with actual token)
function getLocationInfo(callback) {
    fetch('https://ipinfo.io/json?token=cd0380c4a96a2b')
        .then(response => response.json())
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('Error fetching location info:', error);
            callback(null);
        });
}

// Check if user is logged in
auth.onAuthStateChanged(user => {
    if (user) {
        // User is logged in, update information
        const deviceInfo = getDeviceInfo();
        const timestamp = new Date().toISOString();

        getLocationInfo(locationInfo => {
            const userData = {
                lastLogin: timestamp,
                deviceInfo: deviceInfo,
                locationInfo: locationInfo
            };

            // Update user data in Firestore
            firestore.collection('users').doc(user.uid).update(userData)
                .then(() => {
                    console.log('User data updated successfully');
                })
                .catch(error => {
                    console.error('Error updating user data:', error);
                });
        });
    }
});
