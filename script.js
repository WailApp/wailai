let chatInput = null;
let sendButton = null;
let chatContainer = null;
let themeButton = null;
let deleteButton = null;
const weatherApiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your OpenWeatherMap API key

// Default responses in English and Arabic
const defaultResponses = {
    en: [
        "Hello!",
        "I'm doing well, thank you.",
        "I'm WailAI, an AI chatbot programmed to assist you.",
        "Today is a great day!",
        "I can perform basic calculations and translations.",
        "I'm sorry, I don't have a response for that right now."
    ],
    ar: [
        "مرحبًا!",
        "أنا بخير، شكرًا.",
        "أنا WailAI، روبوت دردشة مبرمج لمساعدتك.",
        "اليوم يوم رائع!",
        "أستطيع القيام بحسابات أساسية وترجمات.",
        "آسف، ليس لدي إجابة على ذلك السؤال حاليًا."
    ]
};

// Object to store reminders and important information
const reminders = {
    "موعد الاجتماع القادم": "يوم الخميس الساعة 10 صباحًا",
    "مهمة الأسبوع القادم": "إعداد تقرير التقييم الشهري"
};

// Load data from local storage
const loadDataFromLocalStorage = () => {
    let themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    let defaultText = `<div class="default-text">
                        <h1>WailAI Beta 2.0.0</h1>
                        <p>Start a conversation and explore the power of WailJSCode.<br> Your chat history will be displayed here.</p>
                    </div>`;

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

// Create chat element
const createChatElement = (content, className) => {
    let chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
};

// Function to detect language (simple version based on characters)
const detectLanguage = (text) => {
    let arabicPattern = /[\u0600-\u06FF]/;
    return arabicPattern.test(text) ? 'ar' : 'en';
};

// Function to get a random response based on language and category
const getRandomResponse = (language, category) => {
    let responses = defaultResponses[language] || defaultResponses['en'];
    switch (category) {
        case 'howAreYou':
            return responses[1]; // Return "I'm doing well, thank you."
        case 'date':
            let today = new Date();
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return language === 'ar' 
                ? `اليوم هو ${today.toLocaleDateString('ar-EG', options)}.`
                : `Today is ${today.toLocaleDateString('en-US', options)}.`;
        case 'location':
            return responses[4]; // Return "I'm sorry, I don't have a response for that right now."
        case 'joke':
            return language === 'ar'
                ? "لماذا لا يثق العلماء في الذرات؟ لأنها تُكوِّن كل شيء!"
                : "Why don't scientists trust atoms? Because they make up everything!";
        default:
            return responses[0]; // Return "Hello!"
    }
};

// Function to handle reminders
const handleReminders = (userText) => {
    let language = detectLanguage(userText);
    let reminderKeys = Object.keys(reminders);

    for (let key of reminderKeys) {
        if (userText.toLowerCase().includes(key)) {
            return reminders[key];
        }
    }

    return getRandomResponse(language, 'default');
};

// Function to handle communication tips
const handleCommunicationTips = (userText) => {
    let language = detectLanguage(userText);

    if (userText.toLowerCase().includes('كيف أحسن التواصل')) {
        return language === 'ar'
            ? "حاول أن تكون واضحًا وصريحًا في التعبير عن أفكارك واستمع بعناية للآخرين."
            : "Try to be clear and explicit in expressing your ideas and actively listen to others.";
    }

    return getRandomResponse(language, 'default');
};

// Function to get current location information
const getCurrentLocationInfo = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;

            fetch(endpoint)
                .then(response => response.json())
                .then(data => {
                    let location = data.name;
                    let description = data.weather[0].description;
                    let temp = data.main.temp;
                    let info = language === 'ar' 
                        ? `الموقع الحالي: ${location}. الطقس: ${description} مع درجة حرارة ${temp}°C.`
                        : `Current location: ${location}. Weather: ${description} with temperature ${temp}°C.`;
                    resolve(info);
                })
                .catch(error => reject("Unable to retrieve location information."));
        }, error => reject("Location access denied."));
    });
};

// Function to play music and display latest news
const handleMusicAndNews = (userText) => {
    let language = detectLanguage(userText);

    if (userText.toLowerCase().includes('play music')) {
        // Code to play music
        return language === 'ar'
            ? "يتم الآن تشغيل الموسيقى."
            : "Music is now playing.";
    } else if (userText.toLowerCase().includes('latest news')) {
        // Code to fetch latest news
        return language === 'ar'
            ? "هذا آخر الأخبار."
            : "Here are the latest news.";
    }

    return getRandomResponse(language, 'default');
};

// Function to provide entertainment services
const handleEntertainment = (userText) => {
    let language = detectLanguage(userText);

    if (userText.toLowerCase().includes('tell me a joke')) {
        return language === 'ar'
            ? "لماذا لا يثق العلماء في الذرات؟ لأنها تُكوِّن كل شيء!"
            : "Why don't scientists trust atoms? Because they make up everything!";
    } else if (userText.toLowerCase().includes('play game')) {
        return language === 'ar'
            ? "هل تحب لعب الألعاب؟ جرب أن تحدثني!"
            : "Do you like playing games? Let's try a word game!";
    }

    return getRandomResponse(language, 'default');
};

// Function to get chatbot response asynchronously
const getChatResponse = async (userText) => {
    return new Promise(resolve => {
        setTimeout(() => {
            let language = detectLanguage(userText); // Assuming you have a function to detect language

            if (userText.toLowerCase().includes('كيف حالك') || userText.toLowerCase().includes('how are you')) {
                resolve(getRandomResponse(language, 'howAreYou'));
            } else if (userText.toLowerCase().includes('ما هو اليوم') || userText.toLowerCase().includes('what is today')) {
                resolve(getRandomResponse(language, 'date'));
            } else if (userText.toLowerCase().includes('أين أنا') || userText.toLowerCase().includes('where am i')) {
                getCurrentLocationInfo().then(info => {
                    resolve(info);
                }).catch(error => {
                    resolve("Unable to retrieve location information.");
                });
            } else if (userText.toLowerCase().includes('حساب') || userText.toLowerCase().includes('calculate')) {
                let expression = userText.replace(/حساب|calculate/gi, '').trim();
                try {
                    let result = eval(expression);
                    resolve(`The result of ${expression} is ${result}`);
                } catch (error) {
                    resolve("Invalid expression. Please check your input.");
                }
            } else if (userText.toLowerCase().includes('اقول لك نكتة') || userText.toLowerCase().includes('tell me a joke')) {
                resolve(handleEntertainment(userText));
            } else if (userText.toLowerCase().includes('طقس في') || userText.toLowerCase().includes('weather in')) {
                let location = userText.replace(/طقس في|weather in/gi, '').trim();
                getWeather(location, language).then(weatherInfo => {
                    resolve(weatherInfo);
                }).catch(error => {
                    resolve("Weather information could not be retrieved. Please try again.");
                });
            } else if (userText.toLowerCase().includes('تذكير') || userText.toLowerCase().includes('reminder')) {
                resolve(handleReminders(userText));
            } else if (userText.toLowerCase().includes('نصيحة تواصل') || userText.toLowerCase().includes('communication tip')) {
                resolve(handleCommunicationTips(userText));
            } else if (userText.toLowerCase().includes('موسيقى') || userText.toLowerCase().includes('news')) {
                resolve(handleMusicAndNews(userText));
            } else {
                // For any other question, return a random default response
                resolve(getRandomResponse(language, 'default'));
            }
        }, 1000); // Simulate a delay of 1 second for bot typing effect
    });
};

// Function to get weather information
const getWeather = async (location, language) => {
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}&units=metric`;

    return fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let description = data.weather[0].description;
            let temp = data.main.temp;
            return language === 'ar' 
                ? `الطقس في ${location}: ${description} مع درجة حرارة ${temp}°C.`
                : `The weather in ${location}: ${description} with a temperature of ${temp}°C.`;
        })
        .catch(error => {
            return language === 'ar' 
                ? 'تعذر الحصول على معلومات الطقس. حاول مرة أخرى.'
                : 'Weather information could not be retrieved. Please try again.';
        });
};

// Function to handle outgoing chat messages
const handleOutgoingChat = async () => {
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
};

// Function to toggle theme
const handleThemeToggle = () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", themeButton.innerText);
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
};

// Function to handle deletion of chats
const handleDeleteChats = () => {
    if (confirm("Are you sure you want to delete all chats?")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalStorage();
    }
};

// Function to adjust input height
const adjustInputHeight = () => {
    chatInput.style.height = "50px";
};

// Event listener for DOM content loaded
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
