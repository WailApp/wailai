let chatInput = null;
let sendButton = null;
let chatContainer = null;
let themeButton = null;
let deleteButton = null;

const defaultResponses = {
    greetings: [
        "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
        "أهلاً! كيف يمكنني أن أكون مفيداً لك؟",
        "مرحبًا بك! هل هناك شيء يمكنني مساعدتك فيه؟",
        "مرحبًا، كيف يمكنني أن أساعدك اليوم؟",
        "أهلاً، هل تحتاج إلى مساعدة في شيء معين؟"
    ],
    gratitude: [
        "أنا بخير، شكرًا.",
        "شكرًا، أنا بخير.",
        "أشكرك على الاهتمام، أنا بخير.",
        "شكرًا للسؤال، أنا بحالة جيدة."
    ],
    botIdentity: [
        "أنا WailAI، روبوت الدردشة الذكي.",
        "أنا هنا لمساعدتك، أنا WailAI.",
        "أنا الذكاء الاصطناعي WailAI.",
        "أنا هنا كروبوت للدردشة، أنا WailAI."
    ],
    general: [
        "أستطيع القيام بحسابات أساسية وترجمات.",
        "يمكنني مساعدتك في إجراء حسابات بسيطة والبحث على الويب.",
        "أنا هنا لتوفير المعلومات والمساعدة فيما تحتاج إليه."
    ],
    apology: [
        "آسف، ليس لدي إجابة على ذلك السؤال حاليًا.",
        "عذرًا، لم أتمكن من مساعدتك في هذا الوقت.",
        "عذرًا، لم أفهم سؤالك تمامًا.",
        "أنا آسف، يبدو أنني لست متأكدًا كيف يمكنني مساعدتك بهذا."
    ]
};

const loadDataFromLocalStorage = () => {
    let themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    let defaultText = `
        <div class="default-text">
            <h1>WailAI 2.0</h1>
            <p class="p">WailAI بحلة جديد و بقدرات فائقة. <br> سيتم عرض تاريخ محادثتك هنا.</p>
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
}

const createChatElement = (content, className) => {
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
}

const getRandomResponse = (category) => {
    let responses = defaultResponses[category] || [];
    let randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

const translateText = async (text, targetLanguage) => {
    return text; // Dummy implementation for Arabic only
};

const getWeather = async (city) => {
    return `الطقس في ${city}: مشمس، 25°C`; // Dummy implementation for Arabic only
};

const getNews = async () => {
    return "أحدث الأخبار: تقدم التكنولوجيا في الذكاء الاصطناعي"; // Dummy implementation for Arabic only
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
        return 'عذرًا، لم أتمكن من العثور على معلومات حول هذا الموضوع.';
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

const generalKeywords = ['عام', 'عامة', 'general', 'context', 'سياق'];
const jokeKeywords = ['نكتة', 'نكته', 'joke', 'jokes'];
const weatherKeywords = ['طقس في'];

const getChatResponse = async (userText) => {
    if (userText.toLowerCase().includes('كيف حالك')) {
        return getRandomResponse('greetings');
    } else if (userText.toLowerCase().includes('ما هو اليوم')) {
        return getRandomResponse('greetings');
    } else if (userText.toLowerCase().includes('أين أنا')) {
        return getRandomResponse('greetings');
    } else if (userText.toLowerCase().includes('حساب')) {
        let expression = userText.replace(/حساب|calculate/gi, '').trim();
        try {
            let result = eval(expression);
            return `نتيجة ${expression} هي ${result}`;
        } catch (error) {
            return "تعبير غير صالح. يرجى التحقق من إدخالك.";
        }
    } else if (userText.toLowerCase().includes('أخبار')) {
        return getNews();
    } else if (userText.toLowerCase().includes('اكتب مقال عن')) {
        let topic = userText.replace(/اكتب مقال عن/gi, '').trim();
        return getWikipediaArticle(topic);
    } else {
        if (checkForKeyword(userText, jokeKeywords)) {
            return getRandomResponse('greetings');
        } else if (checkForKeyword(userText, weatherKeywords)) {
            let city = extractCity(userText, weatherKeywords);
            return getWeather(city);
        } else {
            let foundGeneralKeyword = generalKeywords.find(keyword => userText.toLowerCase().includes(keyword));
            if (foundGeneralKeyword) {
                return "أفهم أنك ترغب في تحليل السياق العام لجملتك.";
            } else {
                return getRandomResponse('greetings');
            }
        }
    }
}

const checkForKeyword = (text, keywords) => {
    return keywords.some(keyword => text.toLowerCase().includes(keyword));
}

const extractCity = (text, keywords) => {
    let city = '';
    keywords.forEach(keyword => {
        if (text.toLowerCase().includes(keyword)) {
            city = text.replace(new RegExp(`^.*${keyword}\\s*`), '').trim();
        }
    });
    return city;
}

const handleOutgoingChat = () => {
    let userText = chatInput.value.trim();
    if (!userText) return;

    chatInput.value = "";
    chatInput.style.height = "50px";

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
                                                        <img src="images/chatbot.png" alt="chatbot-img">
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
}

const handleThemeToggle = () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
}

const handleDeleteChats = () => {
    if (confirm("هل أنت متأكد أنك تريد حذف كل المحادثات؟")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalStorage();
    }
}

const adjustInputHeight = () => {
    chatInput.style.height = "50px";
}

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
}
