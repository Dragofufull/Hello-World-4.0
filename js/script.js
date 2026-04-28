document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ПЕЧАТЬ ТЕКСТА (Typewriter) ---
    const introElement = document.getElementById('typewriter-intro');
    const codeElement = document.getElementById('typewriter-code');

    const introContent = '<Вокруг очень много информации. <br> Зачастую, когда хочешь принять важное жизненное решение — очень <br> сильно устаёшь и в итоге многое упускаешь. <br> Чтобы не упускать важные моменты жизни и не терять деньги и время, <br> мы создали этот справочник и постоянно обновляем его./>';
    const codeContent = 'не упускай важные моменты жизни <span style="color: #adff2f;">=</span> <br><span style="color: #ff00d4;">live</span>; <br>не теряй время <span style="color: #adff2f;">=</span> <span style="color: #ffa500;">time</span>; <br>не теряй деньги <span style="color: #adff2f;">=</span> money; <br>с этим тебе поможет этот <span style="color: #ff00d4;">справочник</span> :)';

    function typeEffect(element, content, speed, callback) {
        if (!element) return;
        let i = 0;
        let isTag = false;
        let currentText = "";

        function type() {
            if (i < content.length) {
                let char = content.charAt(i);
                if (char === "<") isTag = true;
                if (char === ">") isTag = false;
                currentText += char;
                element.innerHTML = currentText;
                i++;
                if (isTag) type(); else setTimeout(type, speed);
            } else if (callback) callback();
        }
        type();
    }

    if (introElement) {
        typeEffect(introElement, introContent, 40, () => {
            setTimeout(() => typeEffect(codeElement, codeContent, 60), 500);
        });
    }

    // --- 2. ИНДИКАТОР ПРОКРУТКИ (Scroll Bar) ---
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const bar = document.getElementById("myBar");
        if (bar) bar.style.width = scrolled + "%";
    });

    // --- 3. МАСКА ТЕЛЕФОНА (+374) ---
    const phoneInput = document.getElementById('phone-input');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (!value.startsWith('374')) value = '374' + value;
            let formattedValue = '+374 ';
            if (value.length > 3) formattedValue += '(' + value.substring(3, 5);
            if (value.length > 5) formattedValue += ') ' + value.substring(5, 7);
            if (value.length > 7) formattedValue += '-' + value.substring(7, 9);
            if (value.length > 9) formattedValue += '-' + value.substring(9, 11);
            e.target.value = formattedValue.trim();
        });

        phoneInput.addEventListener('keydown', (e) => {
            if (e.target.value.length <= 5 && e.key === 'Backspace') e.preventDefault();
        });
    }

    // --- 4. ВАЛИДАЦИЯ ПОЛЕЙ ---
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');

    function validateInput(input, condition) {
        if (!input) return;
        if (input.value.length === 0) {
            input.classList.remove('valid', 'invalid');
        } else if (condition) {
            input.classList.add('valid');
            input.classList.remove('invalid');
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
    }

    if (nameInput) {
        nameInput.addEventListener('input', () => validateInput(nameInput, nameInput.value.length >= 2));
    }
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            validateInput(emailInput, emailRegex.test(emailInput.value));
        });
    }

    // --- 5. ОТПРАВКА ФОРМЫ ---
    const form = document.getElementById('my-form');
    const registerBtn = document.getElementById('submit-btn');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); 

            registerBtn.innerText = "Обработка...";
            registerBtn.style.opacity = "0.7";

            const data = new FormData(e.target);

            try {
                const response = await fetch(e.target.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    registerBtn.classList.add('success');
                    registerBtn.innerText = "Успешно отправлено";
                    registerBtn.style.opacity = "1";
                    form.reset();
                    console.log("%c 🎉 Furiku, письмо улетело!", "color: #adff2f; font-size: 20px;");
                } else {
                    registerBtn.innerText = "Ошибка отправки";
                }
            } catch (error) {
                registerBtn.innerText = "Ошибка сети";
            }
        });
    }

    // --- 6. КЛИК ПО ИМЕНИ ---
    const myName = document.querySelector('.copyright-name');
    if (myName) {
        myName.addEventListener('click', () => {
            console.log("%c Привет от Furiku! 🚀", "color: #adff2f; font-size: 20px; font-weight: bold;");
            alert("Спасибо, что заглянули!");
        });
    }

    // --- 7. АНИМАЦИЯ СПИСКА (Scroll Observer) ---
    const topics = document.querySelectorAll('.topics-list');
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                topics.forEach((topic, index) => {
                    setTimeout(() => {
                        topic.classList.add('show');
                    }, index * 150); 
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const guideSection = document.querySelector('.guide-contest-list');
    if (guideSection) {
        observer.observe(guideSection);
    }

    // --- 8. ПЛАВНЫЙ СКРОЛЛ КНОПКИ ---
    const mainBtn = document.querySelector('.btn');
    if (mainBtn) {
        mainBtn.addEventListener('click', () => {
            const registerSection = document.getElementById('register');
            if (registerSection) registerSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});