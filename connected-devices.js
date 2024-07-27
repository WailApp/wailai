// Load Firebase SDK
const firebaseConfig = {
    apiKey: "AIzaSyAzg4PmFoXnS95TXk8FlG9C4bSxhfer86E",
    authDomain: "wailai-a.firebaseapp.com",
    projectId: "wailai-a",
    storageBucket: "wailai-a.appspot.com",
    messagingSenderId: "857204915249",
    appId: "1:857204915249:web:0141c2e2e68ed96769e910",
    measurementId: "G-VRR62LMMMK"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', async () => {
    const user = auth.currentUser;
    if (!user) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
        return;
    }

    const devicesTableBody = document.querySelector('#devices-table tbody');
    const querySnapshot = await db.collection('devices').get();

    querySnapshot.forEach(doc => {
        const data = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.device}</td>
            <td>${new Date(data.timestamp.seconds * 1000).toLocaleString()}</td>
            <td>${data.location}</td>
            <td><button class="disable-btn" data-id="${doc.id}">Disable</button></td>
        `;
        devicesTableBody.appendChild(row);
    });

    document.getElementById('logout-btn').addEventListener('click', async () => {
        try {
            await auth.signOut();
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    });

    devicesTableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('disable-btn')) {
            const deviceId = event.target.getAttribute('data-id');
            try {
                await db.collection('devices').doc(deviceId).delete();
                event.target.closest('tr').remove();
            } catch (error) {
                console.error('Disable device error:', error);
            }
        }
    });
});

