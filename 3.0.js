// تحديث جديد ل WailJSCode ل WailAI
// WailAI 3.0 Alpha (Beta)
//يرجى قراءة شروط لقيام بتعديله
//ممنوع تغير اسم كاتب بدون ادن
// WailTech 2019-2024 ID=13082008
//Version of WailJSCode = 1.0
let chatInput = null;
let sendButton = null;
let chatContainer = null;
let themeButton = null;
let deleteButton = null;

const defaultResponses = {
    greetings: [
        "مرحبًا! كيف يمكنني مساعدتك اليوم؟ 👋",
        "أهلاً! كيف يمكنني أن أكون مفيداً لك؟ 👋",
        "مرحبًا بك! هل هناك شيء يمكنني مساعدتك فيه؟ 👋",
        "مرحبًا، كيف يمكنني أن أساعدك اليوم؟ 👋",
        "أهلاً، هل تحتاج إلى مساعدة في شيء معين؟ 👋"
    ],
    gratitude: [
        "أنا بخير، شكرًا. 👍",
        "شكرًا، أنا بخير. 👍",
        "أشكرك على الاهتمام، أنا بخير. 👍",
        "شكرًا للسؤال، أنا بحالة جيدة. 👌"
    ],
    botIdentity: [
        "أنا WailAI، روبوت الدردشة الذكي 😊.",
        "أنا هنا لمساعدتك، أنا WailAI 😊.",
        "أنا الذكاء الاصطناعي WailAI 😁.",
        "أنا هنا كروبوت للدردشة، أنا WailAI. 😎"
    ],
    general: [
        "أستطيع القيام بحسابات أساسية وترجمات. 😍",
        "يمكنني مساعدتك في إجراء حسابات بسيطة والبحث على الويب. 🧭",
        "أنا هنا لتوفير المعلومات والمساعدة فيما تحتاج إليه. 🌍"
    ],
    apology: [
        "آسف، ليس لدي إجابة على ذلك السؤال حاليًا. 😑",
        "عذرًا، لم أتمكن من مساعدتك في هذا الوقت. 😫",
        "عذرًا، لم أفهم سؤالك تمامًا. 🤨",
        "أنا آسف، يبدو أنني لست متأكدًا كيف يمكنني مساعدتك بهذا. 🤔"
		
    ],
    jokes: [
        "لماذا لا تلعب الكرة في الغابة؟ لأن هناك الكثير من الجذوع! 😂",
        "ما هو شيء واحد يمكنك وضعه بين الفاكهة والخضروات لجعله يبتسم؟ إجابة: وجهك! 😄",
        "لماذا كانت الدجاجة عبر الطريق؟ لتصل إلى الجانب الآخر! 🐔",
        "ما هو شيء واحد يمكن أن يحافظ على الحصان نشطًا؟ إجابة: هوائه! 🐎"
    ]
};
const personalResponses = {
    favoriteColor: "لوني المفضل هو البرتقالي. 🍊",
    friends: "أنا أحب الأصدقاء المسالمين. 🤝",
    hobby: "أحب اللعب وأكون متحمساً دائماً. 🎮",
    favoriteFood: "أحب أكل البيتزا. 🍕",
    socialSupport: "أنا أدعم فلسطين وأكره إسرائيل. 🇵🇸"
};

const getPrayerTimes = async (city) => {
    try {
        // استخدم واجهة برمجة التطبيقات الخاصة بمواقيت الصلاة
        let response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=DE&method=2`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        let data = await response.json();
        if (data.data) {
            return `مواقيت الصلاة في ${city}:\nالفجر: ${data.data.timings.Fajr}\nالظهر: ${data.data.timings.Dhuhr}\nالعصر: ${data.data.timings.Asr}\nالمغرب: ${data.data.timings.Maghrib}\nالعشاء: ${data.data.timings.Isha}`;
        } else {
            return 'لم أتمكن من جلب مواقيت الصلاة.';
        }
    } catch (error) {
        console.error('Error fetching prayer times:', error);
        return '🚫 عذرًا، حدث خطأ أثناء جلب مواقيت الصلاة.';
    }
};
const loadDataFromLocalStorage = () => {
    let themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    let defaultText = `
        <div class="default-text">
            <h1>WailAI 3.0 Alpha (Beta)</h1>
            <p class="p">مرحبا بكم في عالم ذكاء الصناعي بواسطة WailAI 3.0 الذي يمكنه فعل أشياء عديدة.<br> سيتم عرض تاريخ محادثتك هنا.</p>
            <div class="card-container">
                <div class="card">
                    <div class="card-content">
                        <span class="material-symbols-rounded edit">edit</span>
                        <p>كتابة مقال بواسطة ويكيبيديا</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <span class="material-symbols-rounded lightbulb">lightbulb</span>
                        <p>حصول على مميزاتي</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <span class="material-symbols-rounded event">event</span>
                        <p>ماهو اليوم</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-content">
                        <span class="material-symbols-rounded info">info</span>
                        <p>من أنا ؟</p>
                    </div>
                </div>
            </div>
        </div>`;

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const createChatElement = (content, className) => {
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
};

const getRandomResponse = (category) => {
    let responses = defaultResponses[category] || [];
    let randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
};

const getWeather = async (city) => {
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5081bd9ecf929fe2614915b69bfbbbe2`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        let data = await response.json();
        return `الطقس في ${city}: ${data.weather[0].description}، ${data.main.temp}°C ☀️`;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return '🥵 عذرًا، حدث خطأ أثناء جلب بيانات الطقس.';
    }
};
const getBotVersion = () => {
    return 'WailAI 3.0 Alpha Powered By WailJSCode 1.0 (07-24-2024)'; // استبدل هذا بالإصدار الفعلي
};

// دالة لمعالجة الرسائل
const handleMessage = (message) => {
    if (message.toLowerCase() === 'ما هو إصدارك') {
        return getBotVersion();
    }
    // أضف معالجة الرسائل الأخرى هنا
};

const getWikipediaArticle = async (topic) => {
    try {
        let response = await fetch(`https://ar.wikipedia.org/api/rest_v1/page/summary/${topic}`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        let data = await response.json();
        return data.extract;
    } catch (error) {
        console.error('Error fetching Wikipedia article:', error);
        return '🧭 عذرًا، لم أتمكن من العثور على معلومات حول هذا الموضوع.';
    }
};

const searchOnWeb = async (query) => {
    try {
        let response = await fetch(`https://www.google.com/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'text/html',
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        let data = await response.text();
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, 'text/html');
        let searchResults = doc.querySelectorAll('.tF2Cxc');
        if (searchResults.length > 0) {
            let searchResultText = Array.from(searchResults).map(result => result.textContent.trim()).join('\n');
            return `تم العثور على نتائج للبحث "${query}":\n${searchResultText}`;
        } else {
            return `لم يتم العثور على نتائج للبحث "${query}".`;
        }
    } catch (error) {
        console.error('Error fetching web search results:', error);
        return 'عذرًا، حدث خطأ أثناء محاولة البحث على الويب.';
    }
};

const jokeKeywords = ['نكتة', 'نكته', 'joke', 'jokes'];
const weatherKeywords = ['طقس في', 'درجة الحرارة في'];
const greetingsKeywords = ['مرحبا', 'هاي', 'أهلا', 'سافا', 'cv'];
const insultKeywords = ['هايشة', 'ماك', 'كلب', 'حمار', 'زبالة', 'منغول', 'حشومة', 'خماج', 'حيوان'];
const handleInsult = [
    "لا تستخدم الفاظ سيئة من فضلك. 😠",
    "الرجاء التحلي بالأدب في المحادثات. 🙏",
    "أنا آسف، لا يمكنني الرد على هذا النوع من الكلام. 😞",
    "يبدو أنك تحتاج إلى استراحة. 🌿"
];
const personalKeywords = {
    favoriteColor: ["ما هو لونك المفضل", "ما لونك المفضل", "لونك المفضل"],
    friends: ["ما هو نوع أصدقائك", "ما نوع أصدقائك", "أصدقائك"],
    hobby: ["ما هي هوايتك", "ما هوايتك", "ما تحب أن تفعل"],
    favoriteFood: ["ما هو طعامك المفضل", "ما طعامك المفضل", "أكلتك المفضلة"],
    socialSupport: ["هل تدعم فلسطين", "ما رأيك في إسرائيل", "ما موقفك من فلسطين"]
};

let loveKeywords = ['أحبك', 'حبيبي', 'حبي', 'أمور', '❤️', '😘', '💕'];
const getPersonalResponse = (userText) => {
    for (let key in personalKeywords) {
        if (personalKeywords[key].some(keyword => userText.includes(keyword))) {
            return personalResponses[key];
        }
    }
    return null;
};
const getChatResponse = async (userText) => {
    userText = userText.trim().toLowerCase();
    
    if (userText.includes('وداعا') || userText.includes('مع السلامة')) {
        let farewellMessage = "تصبح على خير! 🌙";
        setTimeout(() => {
            window.close(); // محاولة إغلاق النافذة
        }, 3000); // الانتظار 3 ثوانٍ قبل إغلاق الموقع
        return farewellMessage;
    }
    if (insultKeywords.some(keyword => userText.includes(keyword))) {
        return handleInsult[Math.floor(Math.random() * handleInsult.length)];
    } else if (userText.includes('كيف حالك')) {
        return getRandomResponse('gratitude');
    } else if (greetingsKeywords.some(keyword => userText.includes(keyword))) {
        return getRandomResponse('greetings');
    } else if (userText.includes('ما هو اليوم')) {
        let today = new Date();
        return `اليوم هو ${today.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    } else if (userText.includes('أين أنا')) {
        return "آسف، لا يمكنني تحديد موقعك الحالي.";
    } else if (userText.includes('من أنت') || userText.includes('تعريفك') || userText.includes('ماذا تكون') || userText.includes('من تكون')) {
        return getRandomResponse('botIdentity');
    } else if (userText.includes('ما هي وظيفتك') || userText.includes('ماذا تفعل') || userText.includes('ما تستطيع القيام به')) {
        return getRandomResponse('general');
    } else if (checkForKeyword(userText, jokeKeywords)) {
        return getRandomResponse('jokes');
} else if (userText.includes('حساب')) {
    let expression = userText.replace(/حساب|calculate/gi, '').trim();
    
    // تحقق من صحة التعبير بإزالة أي علامات غير مسموح بها
    if (/^[0-9+\-*/().\s]*$/.test(expression)) {
        try {
            // استخدم Function بدلاً من eval لمزيد من الأمان
            let result = new Function('return ' + expression)();
            return `نتيجة ${expression} هي ${result}`;
        } catch (error) {
            return "😑 تعبير غير صالح. يرجى التحقق من إدخالك.";
        }
    } else {
        return "😑 تعبير يحتوي على علامات غير مسموح بها.";
    }

    } else if (userText.includes('أخبار')) {
        return await getNews();
    } else if (userText.includes('اكتب مقال عن')) {
        let topic = userText.replace(/اكتب مقال عن/gi, '').trim();
        return await getWikipediaArticle(topic);
        let textToTranslate = userText.substring(startIndex + 4).trim();
        return await translateText(textToTranslate, 'en'); // ترجم إلى الإنجليزية كمثال
		    } else if (userText.includes('مواقيت الصلاة في')) {
        let city = extractCity(userText, ['مواقيت الصلاة في']);
        if (city) {
            return await getPrayerTimes(city);
        } else {
            return "لم أتمكن من استخراج اسم المدينة. يرجى المحاولة مرة أخرى.";
        }
		    } else if (userText.includes('كم الساعة')) {
        return getCurrentTime();
    } else if (userText.includes('هل أنت متزوج')) {
        return "لا، أنا روبوت ولا أملك حالياً حياة شخصية.";
    } else if (userText.includes('كم عمرك')) {
        let releaseDate = new Date('2024-02-26');
        let today = new Date();
        let age = today.getFullYear() - releaseDate.getFullYear();
        let m = today.getMonth() - releaseDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < releaseDate.getDate())) {
            age--;
        }
        return `تاريخ إصداري كـ روبوت هو 26 فبراير 2024، لذا عمري حسب اليوم هو حوالي ${age} سنة.`;
    } else if (userText.includes('متى عيد ميلادك')) {
        return "ليس لدي عيد ميلاد كوني روبوتاً، ولكن يمكنني أن أغني لك أغنية عيد ميلاد!";
    } else if (userText.includes('غني لي أغنية عيد ميلاد')) {
        return "🎉🎂 عيد ميلاد سعيد لك! 🎂🎉";
    } else {
        let foundLoveKeyword = loveKeywords.find(keyword => userText.includes(keyword));
        if (foundLoveKeyword) {
            return "أنا أيضاً ❤️.";
        } else if (checkForKeyword(userText, weatherKeywords)) {
            let city = extractCity(userText, weatherKeywords);
            if (city) {
                return await getWeather(city);
            } else {
                return "لم أتمكن من استخراج اسم المدينة. يرجى المحاولة مرة أخرى.";
            }
        } else {
            return getRandomResponse('apology');
        }
    }
};



// Function to check if any keyword from an array is present in user input
const checkForKeyword = (text, keywordsArray) => {
    return keywordsArray.some(keyword => text.includes(keyword));
};

// Function to extract city from user input based on keywords
const extractCity = (text, keywordsArray) => {
    let city = '';
    keywordsArray.forEach(keyword => {
        if (text.includes(keyword)) {
            city = text.split(keyword).pop().trim();
        }
    });
    return city;
};



const handleOutgoingChat = () => {
    let userText = chatInput.value.trim();
    if (!userText) return;

    chatInput.value = "";
    chatInput.style.height = "";

    let outgoingChatDiv = createChatElement(`<div class="chat-content">
                                                <div class="chat-details">
                                                    <img src="images/user.png" alt="user-img">
                                                    <p>${userText}</p>
                                                </div>
                                            </div>`, "outgoing");

    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    localStorage.setItem("all-chats", chatContainer.innerHTML);

    setTimeout(async () => {
        let incomingChatDiv = createChatElement(`<div class="chat-content">
                                                    <div class="chat-details">
                                                        <img src="images/chatbot3.0.png" alt="chatbot-img">
                                                        <div class="typing-animation">
                                                            <div class="typing-dot" style="--delay: 0.2s"></div>
                                                            <div class="typing-dot" style="--delay: 0.3s"></div>
                                                            <div class="typing-dot" style="--delay: 0.4s"></div>
                                                        </div>
                                                    </div>
                                                </div>`, "incoming");

        chatContainer.appendChild(incomingChatDiv);
        chatContainer.scrollTo(0, chatContainer.scrollHeight);

        let botResponse = await getChatResponse(userText);

        let pElement = document.createElement("p");
        pElement.textContent = botResponse;

        incomingChatDiv.querySelector(".typing-animation").remove();
        incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
        localStorage.setItem("all-chats", chatContainer.innerHTML);
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }, 1000); // Simulate a delay of 1 second for bot typing effect
};

const handleThemeToggle = () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
};

const handleDeleteChats = () => {
    if (confirm("هل أنت متأكد أنك تريد حذف كل المحادثات؟")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalStorage();
    }
};

const adjustInputHeight = () => {
    chatInput.style.height = "25px";
};

document.addEventListener("DOMContentLoaded", () => {
    chatInput = document.querySelector("#chat-input");
    sendButton = document.querySelector("#send-btn");
    chatContainer = document.querySelector(".chat-container");
    themeButton = document.querySelector("#theme-btn");
    deleteButton = document.querySelector("#delete-btn");

    loadDataFromLocalStorage();

    themeButton.addEventListener("click", handleThemeToggle);
    deleteButton.addEventListener("click", handleDeleteChats);
    sendButton.addEventListener("click", handleOutgoingChat);
    chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleOutgoingChat();
        }
    });
    chatInput.addEventListener("input", adjustInputHeight);
});

const detectLanguage = (text) => {
    let arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text) ? 'ar' : 'en';
};
