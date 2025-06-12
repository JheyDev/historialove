document.addEventListener('DOMContentLoaded', () => {
    const backgroundHearts = document.getElementById('background-hearts');
    const startStoryButton = document.getElementById('startStoryButton');
    const contentContainer = document.querySelector('.content-container');
    const storyDisplayContainer = document.getElementById('story-display-container'); // O container do scrapbook
    const scrapbookSections = document.querySelectorAll('.scrapbook-section'); // Seleciona as seções para observação

    const numberOfHearts = 35;
    const heartVariations = [
        { opacity: 0.4, filter: 'none' }, // Coração vermelho original (mais visível)
        { opacity: 0.3, filter: 'brightness(0.7)' }, // Vermelho mais escuro
        { opacity: 0.2, filter: 'brightness(0.4)' }, // Vermelho bem escuro
        { opacity: 0.1, filter: 'grayscale(1) brightness(0.2)' } // Quase preto (com filtro de escala de cinza e brilho baixo)
    ];

    // --- Geração e Animação dos Corações de Fundo ---
    function createHearts() {
        for (let i = 0; i < numberOfHearts; i++) {
            const heart = document.createElement('div');
            heart.classList.add('heart');

            const randomVariation = heartVariations[Math.floor(Math.random() * heartVariations.length)];

            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            heart.style.left = `${startX}vw`;
            heart.style.top = `${startY}vh`;

            const minSize = 60;
            const maxSize = 180;
            const size = Math.random() * (maxSize - minSize) + minSize;
            heart.style.setProperty('--heart-size', `${size}px`);

            heart.style.setProperty('--heart-opacity', randomVariation.opacity);
            heart.style.setProperty('--heart-filter', randomVariation.filter);

            const duration = Math.random() * 15 + 10;
            const delay = Math.random() * 8;
            const scaleInitial = Math.random() * 0.4 + 0.7;
            const scaleMid = Math.random() * 0.3 + 1;
            const translateX = (Math.random() - 0.5) * 250;
            const translateY = (Math.random() - 0.5) * 250;
            const rotateInitial = (Math.random() - 0.5) * 45;

            heart.style.animationDuration = `${duration}s`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.setProperty('--heart-scale-initial', scaleInitial);
            heart.style.setProperty('--heart-scale-mid', scaleMid);
            heart.style.setProperty('--heart-translate-x', `${translateX}px`);
            heart.style.setProperty('--heart-translate-y', `${translateY}px`);
            heart.style.setProperty('--heart-rotate-initial', `${rotateInitial}deg`);
            heart.style.animation = `floatHeart ${duration}s infinite ease-in-out alternate ${delay}s`;

            backgroundHearts.appendChild(heart);
        }
    }

    // --- Intersection Observer para revelar seções do scrapbook ao rolar ---
    const observerOptions = {
        root: null, // Observa a viewport
        rootMargin: '0px',
        threshold: 0.1 // A seção se torna visível quando 10% dela está na viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Não desobserva para que a seção possa sumir e reaparecer se rolar para cima e para baixo
                // observer.unobserve(entry.target); 
            } else {
                // Opcional: remover a classe 'visible' quando a seção sai da viewport
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // --- Ação do Botão startStoryButton (Primeiro Botão) ---
    startStoryButton.addEventListener('click', () => {
        // Fazer o container principal e os corações sumirem
        contentContainer.style.opacity = '0';
        backgroundHearts.style.opacity = '0';

        const hearts = document.querySelectorAll('.heart');
        hearts.forEach(heart => {
            heart.style.transition = 'transform 1s ease-in, opacity 1s ease-in';
            heart.style.transform = `translateY(${window.innerHeight * 1.5}px) rotate(90deg) scale(0)`;
            heart.style.opacity = '0';
        });

        // Após um tempo, mostrar a seção da história do scrapbook
        setTimeout(() => {
            contentContainer.style.display = 'none';
            backgroundHearts.style.display = 'none';

            storyDisplayContainer.style.visibility = 'visible';
            storyDisplayContainer.style.opacity = '1';

            // Observa cada seção do scrapbook para revelação ao rolar
            scrapbookSections.forEach(section => {
                observer.observe(section);
            });

        }, 1200);
    });

    // Inicia a criação dos corações de fundo
    createHearts();
});
