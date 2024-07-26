// إعدادات Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAzg4PmFoXnS95TXk8FlG9C4bSxhfer86E",
    authDomain: "wailai-a.firebaseapp.com",
    projectId: "wailai-a",
    storageBucket: "wailai-a.appspot.com",
    messagingSenderId: "857204915249",
    appId: "1:857204915249:web:0141c2e2e68ed96769e910",
    measurementId: "G-VRR62LMMMK"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// الحصول على مرجع لخدمة المصادقة
const auth = firebase.auth();

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return user.sendEmailVerification()
                .then(() => {
                    // تسجيل الدخول تلقائيًا
                    return auth.signInWithEmailAndPassword(email, password);
                });
        })
        .then(() => {
            // توجيه المستخدم إلى صفحة التحقق من البريد الإلكتروني
            window.location.href = 'email-verification.html';
        })
        .catch(error => {
            // عرض رسالة الخطأ في العنصر المناسب
            const errorElement = document.getElementById('login-error');
            if (errorElement) {
                errorElement.innerText = 'Error: ' + error.message;
            } else {
                console.error('Error:', error.message);
            }
        });
});
