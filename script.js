document.addEventListener('DOMContentLoaded', () => {
    
    // --- Observer para Fade Up ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if(targetSection){
                const offsetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - 20;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // --- Carrossel Logic ---
    const initCarousel = () => {
        const track = document.querySelector('.carousel-track');
        const dots = document.querySelectorAll('.dot');
        if (!track || dots.length === 0) return;

        const cards = document.querySelectorAll('.google-card');
        
        // --- MEDIDA AJUSTADA PARA NÃO CORTAR ---
        const cardWidth = 320; 
        const gap = 24; 
        const moveAmount = cardWidth + gap; 
        
        let currentIndex = 0;
        let autoPlayInterval;

        // Atualiza Posição Visual
        const updateCarousel = () => {
            const translateX = -(currentIndex * moveAmount);
            track.style.transform = `translateX(${translateX}px)`;
            
            // Atualiza Dots (Cicla as 5 bolinhas pelo índice atual)
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === (currentIndex % dots.length));
            });
        };

        // Função de Avanço
        const nextSlide = () => {
            const width = window.innerWidth;
            let visibleCards = 1;
            if (width >= 1100) visibleCards = 3;
            else if (width >= 768) visibleCards = 2;

            // Loop infinito lógico
            if (currentIndex >= cards.length - visibleCards) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            updateCarousel();
        };

        // Inicia AutoPlay
        const startAutoPlay = () => {
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 4000);
        };

        // Interação com Bolinhas (Skip)
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index; // Pula para o índice da bolinha
                updateCarousel();
                startAutoPlay(); // Reinicia o timer para não pular logo em seguida
            });
        });

        startAutoPlay();
    };

    initCarousel();
});