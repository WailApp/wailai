const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userText = null;

const faq = {
    "Weather": {
        keywords: ["weather", "atmosphere", "weather conditions"],
        response: "To check the weather, you can use a weather app on your phone. ☀️🌧️"
    },
    "Dollar Price": {
        keywords: ["dollar price", "currency price", "dollar"],
        response: "For the dollar price, please visit an economic news website. 💵"
    },
    "Prayer Times": {
        keywords: ["prayer", "prayer times", "prayer schedule"],
        response: "You can find prayer times through mosque apps. ⏰"
    },
    "Site Information": {
        keywords: ["site information", "about the site", "site details"],
        response: "This site aims to provide services and inquiries on various topics. 🌐"
    },
    "Your Age": {
        keywords: ["your age", "your age", "age"],
        response: "I am 16 years old. 🎂"
    },
    "Your Version": {
        keywords: ["your version", "your edition", "version"],
        response: "My version is 3.0 📦"
    },
    "Palestine": {
        keywords: ["Palestine", "support Palestine", "Palestine issue"],
        response: "I love Palestine very much and support it. ❤️🇵🇸"
    },
    "Israel": {
        keywords: ["Israel", "state", "Israel"],
        response: "Please don't mention that name; I really dislike it. 🚫"
    },
    "Color": {
        keywords: ["color", "favorite color", "colors"],
        response: "My favorite color is blue. 💙"
    },
    "Good Morning": {
        keywords: ["good morning", "morning greetings", "morning"],
        response: "Good morning! ☀️"
    },
    "Good Evening": {
        keywords: ["good evening", "evening greetings", "evening"],
        response: "Good evening! 🌙"
    },
    "How are you?": {
        keywords: ["how are you", "how's it going", "how are things"],
        response: "I'm fine, thank you for asking! 😊"
    },
    "Your Favorite Food": {
        keywords: ["your favorite food", "favorite food", "preferred food"],
        response: "My favorite food is pizza. 🍕"
    },
    "Your Country": {
        keywords: ["your country", "your original country", "where are you from"],
        response: "My country is Algeria. 🇩🇿"
    },
    "You": {
        keywords: ["you", "who are you", "your identity"],
        response: "I am WailAI 3.0, a younger sibling of WailAI 2.0. 🤖"
    },
    "Peace Be Upon You": {
        keywords: ["peace be upon you", "greetings", "salutation"],
        response: "And upon you be peace! ✋"
    },
    "Hello": {
        keywords: ["hello", "hi", "greeting"],
        response: "Hello and welcome! 👋"
    },
    "Hi": {
        keywords: ["hi", "hello", "greeting"],
        response: "Hi there! 😊"
    },
    "Who Are You?": {
        keywords: ["who are you", "what's your name", "introduce yourself"],
        response: "I am WailAI, an intelligent assistant. 🤖"
    },
    "What Is Your Name?": {
        keywords: ["what is your name", "your name", "name"],
        response: "My name is WailAI. 🏷️"
    },
    "What Can You Do?": {
        keywords: ["what can you do", "your capabilities", "what you can do"],
        response: "I can answer your questions and assist you with various topics. 🤔💬"
    },
    "How Can I Assist You?": {
        keywords: ["how can I assist you", "help me", "how to assist"],
        response: "You can assist me by asking your questions or making requests. 🙋‍♂️"
    },
    "What Are Your Capabilities?": {
        keywords: ["what are your capabilities", "your abilities", "what you can do"],
        response: "I can analyze texts, answer questions, and provide information. 📚"
    },
    "How Do You Work?": {
        keywords: ["how do you work", "how it works", "how to operate"],
        response: "I work using artificial intelligence and natural language processing techniques. 🧠"
    },
    "What Types of Questions Can I Ask You?": {
        keywords: ["types of questions", "possible questions", "questions"],
        response: "You can ask any questions related to general information, technical help, or other inquiries. ❓"
    },
    "What Information Do You Need to Provide the Best Answer?": {
        keywords: ["what information", "required information", "what you need"],
        response: "I need a clear and specific question to provide the best answer. 📝"
    },
    "What Is Your Release Date?": {
        keywords: ["release date", "version release date", "your release"],
        response: "The release date of the current version is 2024. 📅"
    },
    "How Do You Learn and Improve?": {
        keywords: ["how do you learn", "improve performance", "learning"],
        response: "I learn by processing more data and ongoing training. 📈"
    },
    "What Techniques Do You Use?": {
        keywords: ["used techniques", "what techniques", "techniques"],
        response: "I use artificial intelligence techniques and natural language processing. 🤖🔍"
    },
    "Can You Handle All Languages?": {
        keywords: ["all languages", "languages", "do you handle languages"],
        response: "I can handle many languages, but my capability might be limited in some languages. 🌐"
    },
    "What Sources Do You Rely On for Answering Questions?": {
        keywords: ["sources", "answer sources", "where the information comes from"],
        response: "I rely on the data I was trained on and trustworthy sources online. 📚🔎"
    },
    "How Is Your Information Updated?": {
        keywords: ["information update", "how is it updated", "updating"],
        response: "My information is updated through continuous training and adding new data. 🔄"
    },
    "Do You Have Limits on the Types of Questions You Can Answer?": {
        keywords: ["limits on questions", "type of questions", "questions"],
        response: "Yes, I may not be able to answer questions related to personal information or inappropriate content. 🚫"
    },
    "What Are the Things You Cannot Do?": {
        keywords: ["what you cannot do", "limitations", "restricted abilities"],
        response: "I cannot perform physical commands or access personal information. 🛑"
    },
    "How Do You Handle Incorrect Information?": {
        keywords: ["incorrect information", "handling mistakes", "errors"],
        response: "I try to provide the best answer based on available knowledge, but there might be incorrect information sometimes. 🔍"
    },
    "Do You Learn from Previous Interactions?": {
        keywords: ["learning from interactions", "previous interactions", "learning"],
        response: "Yes, I learn from interactions to improve performance and future responses. 📈"
    },
    "What Operating System Do You Run On?": {
        keywords: ["operating system", "what operating system", "OS"],
        response: "I run on servers using advanced operating systems like Linux. 💻"
    },
    "Can I Modify Your Settings or Customize You?": {
        keywords: ["modify settings", "customization", "settings"],
        response: "Customization is limited, but some settings like FAQs can be modified. ⚙️"
    },
    "How Do You Handle Ambiguous or Unclear Questions?": {
        keywords: ["ambiguous questions", "unclear questions", "handling ambiguity"],
        response: "I try to clarify ambiguous questions and ask for more details if necessary. 🤔"
    },
    "Can I Customize Your Answers According to My Needs?": {
        keywords: ["customize answers", "customization", "answers"],
        response: "You can customize some answers by modifying FAQs, but full customization may be limited. 🛠️"
    },
    "What Types of Questions Might You Not Be Able to Answer?": {
        keywords: ["types of questions", "questions you can't answer", "difficult questions"],
        response: "I may not be able to answer questions related to personal information or inappropriate content. 🚫"
    },
    "Can You Interact with Other Applications or Devices?": {
        keywords: ["interact with applications", "interact with devices", "other applications"],
        response: "I work independently and cannot directly interact with other applications or devices. 🔗"
    },
    "How Do You Protect User Information?": {
        keywords: ["protecting information", "data security", "privacy"],
        response: "I adhere to security standards and data protection to ensure user information confidentiality. 🔒"
    },
    "What Are the Privacy Policies You Follow?": {
        keywords: ["privacy policies", "data privacy", "policies"],
        response: "I adhere to privacy policies that protect user data and ensure safe handling. 📜"
    },
    "How Often Are You Updated?": {
        keywords: ["update frequency", "how often", "updates"],
        response: "I am updated regularly to enhance performance and improve responses. 🔄"
    }
};


function getAnswer(input) {
    input = input.toLowerCase(); // تحويل النص إلى حروف صغيرة للمطابقة
    for (let key in faq) {
        if (faq[key].keywords.some(keyword => input.includes(keyword))) {
            return faq[key].response;
        }
    }
    return "Sorry, I couldn't find a suitable answer. 🤔";
}

const loadDataFromLocalstorage = () => {
    const themeColor = localStorage.getItem("themeColor");
    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

let defaultText = `
    <div class="default-text">
        <h1>WailAI</h1>
        <p class="p">Welcome to the world of artificial intelligence with WailAI 3.0, which can do many things.<br> Your chat history will be displayed here.</p>
        <div class="card-container">
            <div class="card">
                <div class="card-content">
                    <span class="material-symbols-rounded edit">edit</span>
                    <p>Write an article using Wikipedia</p>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <span class="material-symbols-rounded lightbulb">lightbulb</span>
                    <p>Get my features</p>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <span class="material-symbols-rounded event">event</span>
                    <p>What is the date?</p>
                </div>
            </div>
            <div class="card">
                <div class="card-content">
                    <span class="material-symbols-rounded info">info</span>
                    <p>Who am I?</p>
                </div>
            </div>
        </div>
    </div>`;


    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const createChatElement = (content, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv;
};

const getChatResponse = async (incomingChatDiv) => {
    const pElement = document.createElement("p");

    const response = getAnswer(userText);

    try {
        // تقليص وقت الانتظار لإظهار الرد الثابت
        await new Promise(resolve => setTimeout(resolve, 500));
        pElement.textContent = response;
    } catch (error) {
        console.error('Error:', error);
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }

    incomingChatDiv.querySelector(".typing-animation")?.remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    localStorage.setItem("all-chats", chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
};

const copyResponse = (copyBtn) => {
    const responseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(responseTextElement.textContent).then(() => {
        copyBtn.textContent = "done";
        setTimeout(() => copyBtn.textContent = "content_copy", 1000);
    }).catch(err => console.error('Clipboard error:', err));
};

const showTypingAnimation = () => {
    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/chatbot3.0.png" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
    const incomingChatDiv = createChatElement(html, "incoming");
    chatContainer.appendChild(incomingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    getChatResponse(incomingChatDiv);
};

const handleOutgoingChat = () => {
    userText = chatInput.value.trim();
    if (!userText) return;

    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="images/user.png" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;

    const outgoingChatDiv = createChatElement(html, "outgoing");
    chatContainer.querySelector(".default-text")?.remove();
    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
};

deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all the chats?")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalstorage();
    }
});

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    localStorage.setItem("themeColor", document.body.classList.contains("light-mode") ? "light_mode" : "dark_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";
});

const initialInputHeight = chatInput.scrollHeight;

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${initialInputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleOutgoingChat();
    }
});

loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);
