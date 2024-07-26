const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userText = null;

const faq = {
    "الطقس": {
        keywords: ["الطقس", "الجو", "الأحوال الجوية"],
        response: "للتحقق من الطقس، يمكنك استخدام تطبيق الطقس على هاتفك. ☀️🌧️"
    },
    "سعر الدولار": {
        keywords: ["سعر الدولار", "سعر العملة", "دولار"],
        response: "للحصول على سعر الدولار، يرجى زيارة موقع أخبار الاقتصاد. 💵"
    },
    "الصلاة": {
        keywords: ["الصلاة", "أوقات الصلاة", "مواعيد الصلاة"],
        response: "يمكنك العثور على أوقات الصلاة من خلال التطبيقات الخاصة بالمساجد. ⏰"
    },
    "معلومات عن الموقع": {
        keywords: ["معلومات عن الموقع", "حول الموقع", "عن الموقع"],
        response: "هذا الموقع يهدف لتقديم خدمات واستفسارات حول مواضيع متنوعة. 🌐"
    },
    "عمرك": {
        keywords: ["عمرك", "سنك", "عمر"],
        response: "عمري 16 سنة. 🎂"
    },
    "اصدارك": {
        keywords: ["اصدارك", "نسختك", "الإصدار"],
        response: "اصداري هو 3.0 📦"
    },
    "فلسطين": {
        keywords: ["فلسطين", "دعم فلسطين", "قضية فلسطين"],
        response: "أنا أحب فلسطين كثير وأدعمها. ❤️🇵🇸"
    },
    "اسرائيل": {
        keywords: ["اسرائيل", "إسرائيل", "الدولة"],
        response: "لا تذكر لي هذا الاسم، أكرهه جداً. 🚫"
    },
    "لون": {
        keywords: ["لون", "اللون المفضل", "ألوان"],
        response: "لوني المفضل هو الأزرق. 💙"
	    },
    "صباح الخير": {
        keywords: ["صباح الخير", "صباح النور", "صباح"],
        response: "صباح الخير! ☀️"
    },
    "مساء الخير": {
        keywords: ["مساء الخير", "مساء النور", "مساء"],
        response: "مساء الخير! 🌙"
    },
    "كيف حالك؟": {
        keywords: ["كيف حالك", "كيف حال", "كيف الأمور"],
        response: "أنا بخير، شكرًا لسؤالك! 😊"
    },
    "اكلتك": {
        keywords: ["اكلتك", "طعامك المفضل", "أكل مفضل"],
        response: "أكلتي المفضلة هي البيتزا. 🍕"
    },
    "بلدك": {
        keywords: ["بلدك", "بلدك الأصلي", "من أين أنت"],
        response: "بلدي هو الجزائر. 🇩🇿"
    },
    "أنت": {
        keywords: ["أنت", "من أنت", "هويتك"],
        response: "أنا WailAI 3.0، أخ أصغر لـ WailAI 2.0. 🤖"
    },
    "السلام عليكم": {
        keywords: ["السلام عليكم", "سلام", "تحية"],
        response: "وعليكم السلام! ✋"
    },
    "مرحبا": {
        keywords: ["مرحبا", "أهلا", "تحية"],
        response: "أهلا وسهلا! 👋"
    },
    "أهلا": {
        keywords: ["أهلا", "مرحبا", "تحية"],
        response: "أهلا بك! 😊"
    },
    "من أنت؟": {
        keywords: ["من أنت", "ما هو اسمك", "تعريف نفسك"],
        response: "أنا WailAI، مساعد ذكي. 🤖"
    },
    "ما هو اسمك؟": {
        keywords: ["ما هو اسمك", "اسمك", "تعريف"],
        response: "اسمي هو WailAI. 🏷️"
    },
    "ماذا يمكنك أن تفعل؟": {
        keywords: ["ماذا يمكنك أن تفعل", "قدراتك", "ما يمكنك فعله"],
        response: "يمكنني الإجابة على أسئلتك ومساعدتك في مختلف المواضيع. 🤔💬"
    },
    "كيف يمكنني مساعدتك؟": {
        keywords: ["كيف يمكنني مساعدتك", "مساعدتي", "كيف أساعدك"],
        response: "يمكنك مساعدتي بطرح أسئلتك أو تقديم طلباتك. 🙋‍♂️"
    },
    "ما هي القدرات التي تمتلكها؟": {
        keywords: ["ما هي القدرات", "قدراتك", "ما تستطيع فعله"],
        response: "أستطيع تحليل النصوص والإجابة على الأسئلة وتقديم المعلومات. 📚"
    },
    "كيف تعمل؟": {
        keywords: ["كيف تعمل", "طريقة العمل", "كيف أشغل"],
        response: "أعمل باستخدام تقنيات الذكاء الاصطناعي ومعالجة اللغة الطبيعية. 🧠"
    },
    "ما هي أنواع الأسئلة التي يمكنني طرحها عليك؟": {
        keywords: ["أنواع الأسئلة", "ما الأسئلة الممكنة", "أسئلة"],
        response: "يمكنك طرح أي سؤال يتعلق بالمعلومات العامة، المساعدة التقنية، أو أي استفسارات أخرى. ❓"
    },
    "ما هي المعلومات التي تحتاجها لتقديم أفضل إجابة؟": {
        keywords: ["ما هي المعلومات", "المعلومات اللازمة", "ما أحتاجه"],
        response: "أحتاج إلى سؤال واضح ومحدد لتقديم أفضل إجابة. 📝"
    },
    "ما هو تاريخ إصدارك؟": {
        keywords: ["تاريخ إصدارك", "تاريخ الإصدار", "إصدارك"],
        response: "تاريخ إصدار النسخة الحالية هو 2024. 📅"
    },
    "كيف تتعلم وتتحسن؟": {
        keywords: ["كيف تتعلم", "تحسين الأداء", "التعلم"],
        response: "أتعلم من خلال معالجة المزيد من البيانات والتدريب المستمر. 📈"
    },
    "ما هي التقنيات التي تستخدمها؟": {
        keywords: ["التقنيات المستخدمة", "ما هي التقنيات", "تقنيات"],
        response: "أستخدم تقنيات الذكاء الاصطناعي ومعالجة اللغة الطبيعية. 🤖🔍"
    },
    "هل يمكنك التعامل مع جميع اللغات؟": {
        keywords: ["جميع اللغات", "اللغات", "هل تتعامل مع لغات"],
        response: "أستطيع التعامل مع العديد من اللغات، لكن قد تكون قدرتي محدودة في بعض اللغات. 🌐"
    },
    "ما هي المصادر التي تعتمد عليها للإجابة على الأسئلة؟": {
        keywords: ["المصادر", "مصادر الإجابة", "من أين تأتي المعلومات"],
        response: "أعتمد على البيانات التي تم تدريبي عليها وعلى مصادر موثوقة عبر الإنترنت. 📚🔎"
    },
    "كيف يتم تحديث معلوماتك؟": {
        keywords: ["تحديث المعلومات", "كيف يتم التحديث", "تحديث"],
        response: "يتم تحديث معلوماتي من خلال التدريب المستمر وإضافة بيانات جديدة. 🔄"
    },
    "هل لديك حدود في نوع الأسئلة التي يمكن أن تجيب عليها؟": {
        keywords: ["حدود الأسئلة", "نوع الأسئلة", "أسئلة"],
        response: "نعم، قد لا أتمكن من الإجابة على الأسئلة المتعلقة بالمعلومات الشخصية أو المحتوى غير المناسب. 🚫"
    },
    "ما هي الأشياء التي لا يمكنك القيام بها؟": {
        keywords: ["ما لا يمكنك القيام به", "القيود", "القدرات المحدودة"],
        response: "لا أستطيع تنفيذ الأوامر الفيزيائية أو الوصول إلى المعلومات الشخصية. 🛑"
    },
    "كيف يمكنك التعامل مع المعلومات غير الصحيحة؟": {
        keywords: ["المعلومات غير الصحيحة", "التعامل مع الأخطاء", "الأخطاء"],
        response: "أحاول تقديم أفضل إجابة بناءً على المعرفة المتاحة، لكن يمكن أن تكون هناك معلومات غير صحيحة أحياناً. 🔍"
    },
    "هل تتعلم من التفاعلات السابقة؟": {
        keywords: ["التعلم من التفاعلات", "التفاعل السابق", "التعلم"],
        response: "نعم، أتعلم من التفاعلات لتحسين الأداء والردود المستقبلية. 📈"
    },
    "ما هو نظام التشغيل الذي تعمل عليه؟": {
        keywords: ["نظام التشغيل", "ما هو نظام التشغيل", "أنظمة التشغيل"],
        response: "أعمل على خوادم تستخدم أنظمة تشغيل متقدمة مثل Linux. 💻"
    },
    "هل يمكنني تعديل إعداداتك أو تخصيصك؟": {
        keywords: ["تعديل الإعدادات", "تخصيص", "الإعدادات"],
        response: "التخصيص محدود، لكن يمكن تعديل بعض الإعدادات مثل الأسئلة الشائعة. ⚙️"
    },
    "كيف تتعامل مع الأسئلة الغامضة أو غير الواضحة؟": {
        keywords: ["الأسئلة الغامضة", "الأسئلة غير الواضحة", "التعامل مع الغموض"],
        response: "أحاول توضيح الأسئلة الغامضة وطلب مزيد من التفاصيل إذا لزم الأمر. 🤔"
    },
    "هل يمكنني تخصيص إجاباتك وفقًا لاحتياجاتي؟": {
        keywords: ["تخصيص الإجابات", "تخصيص", "الإجابات"],
        response: "يمكنك تخصيص بعض الإجابات عبر تعديل الأسئلة الشائعة، لكن التخصيص الكامل قد يكون محدوداً. 🛠️"
    },
    "ما هي أنواع الأسئلة التي قد لا تكون قادرًا على الإجابة عليها؟": {
        keywords: ["أنواع الأسئلة", "الأسئلة التي لا أستطيع الإجابة عليها", "الأسئلة الصعبة"],
        response: "قد لا أتمكن من الإجابة على الأسئلة المتعلقة بالمعلومات الشخصية أو المحتوى غير المناسب. 🚫"
    },
    "هل يمكنك التفاعل مع تطبيقات أو أجهزة أخرى؟": {
        keywords: ["التفاعل مع التطبيقات", "التفاعل مع الأجهزة", "التطبيقات الأخرى"],
        response: "أنا أعمل بشكل مستقل ولا أتمكن من التفاعل مباشرة مع التطبيقات أو الأجهزة الأخرى. 🔗"
    },
    "كيف تحمي معلومات المستخدمين؟": {
        keywords: ["حماية المعلومات", "أمان المعلومات", "خصوصية البيانات"],
        response: "ألتزم بمعايير الأمان وحماية البيانات لضمان سرية معلومات المستخدمين. 🔒"
    },
    "ما هي السياسات المتعلقة بخصوصية البيانات التي تتبعها؟": {
        keywords: ["سياسات الخصوصية", "خصوصية البيانات", "سياسات"],
        response: "ألتزم بسياسات الخصوصية التي تحمي بيانات المستخدمين وتضمن استخدامها بشكل آمن. 🛡️"
    },
    "هل يمكنك العمل بدون اتصال بالإنترنت؟": {
        keywords: ["بدون اتصال بالإنترنت", "العمل بدون إنترنت", "الاتصال"],
        response: "أنا أحتاج إلى اتصال بالإنترنت للوصول إلى المعلومات وتقديم الإجابات. 🌐"
    },
    "كيف تعرف أن إجابتك صحيحة أو دقيقة؟": {
        keywords: ["صحة الإجابة", "دقة الإجابة", "كيف تتأكد"],
        response: "أعتمد على البيانات التي تم تدريبي عليها، لكن يمكن أن تكون هناك معلومات غير دقيقة أحياناً. 📊"
    },
    "هل يمكنك تحديث معلوماتك تلقائيًا؟": {
        keywords: ["تحديث تلقائي", "تحديث المعلومات", "التحديث"],
        response: "أحتاج إلى تحديث بياناتي بشكل دوري عبر التدريب المستمر، وليس تلقائيًا. 🔄"
    },
    "كيف يمكنك تحسين إجاباتك بمرور الوقت؟": {
        keywords: ["تحسين الإجابات", "تحسين الأداء", "التطور"],
        response: "أتحسن من خلال معالجة المزيد من البيانات وتلقي التدريب على أنماط جديدة من الأسئلة. 📈🤖"
    },
    "ما هي العمليات التي تقوم بها لتحليل الأسئلة؟": {
        keywords: ["تحليل الأسئلة", "عملية التحليل", "كيف تحلل"],
        response: "أقوم بتحليل الأسئلة من خلال تقنيات معالجة اللغة الطبيعية لفهم النص وتقديم إجابة مناسبة. 🔍"
    },
    "كيف يتم تصنيف الأسئلة والأجوبة؟": {
        keywords: ["تصنيف الأسئلة والأجوبة", "كيفية التصنيف", "التصنيف"],
        response: "يتم تصنيف الأسئلة والأجوبة بناءً على المواضيع والتصنيفات المتاحة في قاعدة بياناتي. 📂"
    },
    "هل لديك القدرة على التعلم من الأخطاء؟": {
        keywords: ["التعلم من الأخطاء", "الأخطاء", "التعلم"],
        response: "نعم، أتعلم من الأخطاء لتحسين أدائي وتصحيح المعلومات غير الدقيقة. 📚🔄"
    },
    "كيف تتعامل مع المعلومات المتضاربة؟": {
        keywords: ["المعلومات المتضاربة", "التعامل مع التضارب", "التضارب"],
        response: "أحاول تقديم الإجابة الأكثر دقة بناءً على المصادر الموثوقة المتاحة، وأطلب توضيحًا إذا لزم الأمر. ⚖️"
    },
    "هل يمكنك تقديم توصيات بناءً على تفضيلات المستخدمين؟": {
        keywords: ["توصيات", "تفضيلات المستخدمين", "التوصيات"],
        response: "يمكنني تقديم توصيات بناءً على المعلومات المتاحة وتفضيلات المستخدمين. 🎯"
    },
    "ما هي الأنواع المختلفة من الأسئلة التي يمكنك التعامل معها؟": {
        keywords: ["أنواع الأسئلة", "أسئلة مختلفة", "الأسئلة"],
        response: "يمكنني التعامل مع أسئلة عامة، تقنية، تعليمية، واستفسارات حول مواضيع متنوعة. 🌟"
    },
    "هل يمكنك ترجمة اللغات بشكل فوري؟": {
        keywords: ["ترجمة فورية", "ترجمة اللغات", "الترجمة"],
        response: "أستطيع ترجمة النصوص بين اللغات، لكن قد تحتاج الترجمة إلى بعض التحقق للتحقق من دقتها. 🌐🔄"
    },
    "كيف تتعامل مع الأسئلة ذات الطابع العاطفي أو الشخصي؟": {
        keywords: ["الأسئلة العاطفية", "الأسئلة الشخصية", "التعامل مع العاطفة"],
        response: "أتعامل مع الأسئلة ذات الطابع العاطفي أو الشخصي بحذر وأبذل جهدي لتقديم إجابات ملائمة ومراعية للمشاعر. 💬❤️"
    },
    "هل لديك القدرة على التفاعل مع الذكاء الاصطناعي الآخر؟": {
        keywords: ["التفاعل مع الذكاء الاصطناعي", "التفاعل مع الأنظمة الأخرى", "الذكاء الاصطناعي"],
        response: "لا أستطيع التفاعل مباشرة مع أنظمة الذكاء الاصطناعي الأخرى، لكن يمكن تبادل المعلومات بشكل غير مباشر. 🤖🔗"
    },
    "كيف يمكنك توفير الدعم في حالات الطوارئ؟": {
        keywords: ["دعم الطوارئ", "حالات الطوارئ", "الدعم"],
        response: "أنا لا أستطيع تقديم دعم مباشر في حالات الطوارئ، لكن يمكنني توجيهك إلى الموارد المناسبة. 🚑"
    },
    "ما هي التقنيات المستخدمة في فهم اللغة الطبيعية؟": {
        keywords: ["تقنيات فهم اللغة", "معالجة اللغة الطبيعية", "فهم اللغة"],
        response: "أستخدم تقنيات مثل تحليل النصوص، تعلم الآلة، والشبكات العصبية لفهم اللغة الطبيعية. 🧠🔍"
    },
    "كيف يمكنني معرفة ما إذا كانت معلوماتك محدثة؟": {
        keywords: ["معلومات محدثة", "تحديث المعلومات", "كيفية التحقق"],
        response: "أحاول تقديم أحدث المعلومات المتاحة بناءً على البيانات التي تم تدريبي عليها، ويمكنك التحقق من المصادر الرسمية. 📅🔍"
    },
    "هل يمكنك التعامل مع أسئلة متعددة في نفس الوقت؟": {
        keywords: ["أسئلة متعددة", "التعامل مع أسئلة متعددة", "أسئلة"],
        response: "يمكنني التعامل مع أسئلة متعددة، ولكن قد تحتاج الإجابات إلى بعض الترتيب حسب الأولوية. 📚🔢"
    },
    "ما هي أشهر الأسئلة التي تتلقاها عادة؟": {
        keywords: ["أشهر الأسئلة", "الأسئلة الشائعة", "أسئلة تتكرر"],
        response: "أشهر الأسئلة تتعلق بالمعلومات العامة، الدعم التقني، والتساؤلات عن القدرات والخدمات. 🌟❓"
    }
};

function getAnswer(input) {
    input = input.toLowerCase(); // تحويل النص إلى حروف صغيرة للمطابقة
    for (let key in faq) {
        if (faq[key].keywords.some(keyword => input.includes(keyword))) {
            return faq[key].response;
        }
    }
    return "عذرًا، لم أتمكن من العثور على إجابة مناسبة. 🤔";
}

const loadDataFromLocalstorage = () => {
    const themeColor = localStorage.getItem("themeColor");
    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

   let defaultText = `
        <div class="default-text">
            <h1>WailAI</h1>
            <p class="p">مرحبا بكم في عالم ذكاء الصناعي بواسطة WailAI 2.0 الذي يمكنه فعل أشياء عديدة.<br> سيتم عرض تاريخ محادثتك هنا.</p>
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
