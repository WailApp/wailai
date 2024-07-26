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

// التعامل مع إعادة تعيين كلمة المرور
document.getElementById('reset-password-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('reset-email').value;

    auth.sendPasswordResetEmail(email)
        .then(() => {
            // رسالة إعادة تعيين كلمة المرور أُرسلت بنجاح، الانتقال إلى صفحة أخرى
            window.location.href = 'https://wailapp.github.io/wailai/index.html'; // استبدل بـ URL الصفحة التي تريد الانتقال إليها
        })
        .catch(error => {
            // معالجة الأخطاء وعرض رسالة الخطأ
            document.getElementById('message').innerText = 'خطأ: ' + error.message;
        });
});
