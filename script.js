// script.js

document.addEventListener('DOMContentLoaded', () => {
    // ----- Дата, коли вона дізналась (7 липня 2025, 22:00) -----
    const startDate = new Date(2025, 6, 7, 22, 0, 0); // місяць 6 = липень
    // -----------------------------------------------------------

    // ========== FLOATING HEARTS (мало) ==========
    const heartsContainer = document.getElementById('heartsContainer');
    const heartSymbols = ['❤️', '💕', '💗', '💖'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart-float');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = 8 + Math.random() * 12 + 's';
        heart.style.fontSize = 14 + Math.random() * 20 + 'px';
        heartsContainer.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }

    setInterval(createHeart, 1500);
    for (let i = 0; i < 3; i++) {
        setTimeout(createHeart, i * 500);
    }

    // ========== TYPEWRITER ==========
    const typewriterEl = document.getElementById('typewriter');
    const phrases = [
        'Я тебе дуже ціную',
        'Ти класна',
        'Мила і найкраща дівчина',
        'Ти дуже хороша і комфортна',
 
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseBetween = 2000;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            setTimeout(() => { isDeleting = true; type(); }, pauseBetween);
            return;
        }
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 300);
            return;
        }
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(type, speed);
    }
    setTimeout(type, 500);

    // ========== MOBILE NAV ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    // ========== TIMELINE SCROLL REVEAL ==========
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    timelineItems.forEach(item => observer.observe(item));

    // ========== GAME: CATCH THE HEART ==========
    const gameArea = document.getElementById('gameArea');
    const gameHeart = document.getElementById('gameHeart');
    const scoreSpan = document.getElementById('score');
    const gameMessage = document.getElementById('gameMessage');
    let score = 0;

    function moveHeart() {
        const areaWidth = gameArea.clientWidth;
        const areaHeight = gameArea.clientHeight;
        const heartSize = 60; // approx
        const maxX = areaWidth - heartSize;
        const maxY = areaHeight - heartSize;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        gameHeart.style.left = randomX + 'px';
        gameHeart.style.top = randomY + 'px';
    }

    gameHeart.addEventListener('click', (e) => {
        e.stopPropagation();
        score++;
        scoreSpan.textContent = score;
        // Move heart immediately after catching
        moveHeart();
        // Show cute messages at thresholds
        if (score === 5) {
            gameMessage.textContent = 'Ти молодець 💘';
        } else if (score === 15) {
            gameMessage.textContent = 'Та ти дуже добре ловиш 💖';
        } else if (score === 30) {
            gameMessage.textContent = 'Ну все здаюсь ти виграла 💕';
        } else if (score > 30 && score % 10 === 0) {
            gameMessage.textContent = `Вже ${score} разів 😊`;
        }
        if (score === 1) {
            gameMessage.textContent = 'Перше спіймане 🥰';
        }
    });

    // Move heart every 800ms
    setInterval(moveHeart, 800);
    // Initial position
    moveHeart();

    // ========== REASONS GRID ==========
    const reasons = [
        { icon: '😊', text: 'Ти весела і цікава' },
        { icon: '🕐', text: 'Можна дуже клажно провести час' },
        { icon: '🚶‍♂️', text: 'З тобою класно гуляти' },
        { icon: '🤪', text: 'З тобою можна дурачитись' },
        { icon: '💬', text: 'З тобою цікаво спілкуватись' },
        { icon: '🌈', text: 'З тобою можна отримати не забутні емоції' },
        { icon: '😍', text: 'Ти комфортік' }
    ];

    const reasonsGrid = document.getElementById('reasonsGrid');
    reasons.forEach((reason, idx) => {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.style.transitionDelay = `${idx * 0.07}s`;
        card.innerHTML = `
            <div class="reason-icon">${reason.icon}</div>
            <p class="reason-text">${reason.text}</p>
        `;
        reasonsGrid.appendChild(card);
    });

    const reasonCards = document.querySelectorAll('.reason-card');
    const reasonObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });
    reasonCards.forEach(card => reasonObserver.observe(card));

    // ========== COUNTER ==========
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        if (diff < 0) {
            document.getElementById('daysCount').textContent = '0';
            document.getElementById('hoursCount').textContent = '0';
            document.getElementById('minutesCount').textContent = '0';
            document.getElementById('secondsCount').textContent = '0';
            return;
        }
        const secondsTotal = Math.floor(diff / 1000);
        const days = Math.floor(secondsTotal / (3600 * 24));
        const hours = Math.floor((secondsTotal % (3600 * 24)) / 3600);
        const minutes = Math.floor((secondsTotal % 3600) / 60);
        const seconds = secondsTotal % 60;
        document.getElementById('daysCount').textContent = days;
        document.getElementById('hoursCount').textContent = hours;
        document.getElementById('minutesCount').textContent = minutes;
        document.getElementById('secondsCount').textContent = seconds;
    }
    updateCounter();
    setInterval(updateCounter, 1000);

    // ========== ENVELOPE ==========
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => envelope.classList.toggle('opened'));
});