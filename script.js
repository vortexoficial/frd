document.addEventListener('DOMContentLoaded', () => {
    
    // Observer para Animações de Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15, // Aciona quando 15% do elemento aparece
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    // Smooth Scroll com offset para a Navbar fixa
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if(targetSection){
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Observador específico para o gráfico (Opcional - para garantir reinício da animação)
    const graphObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // A classe 'visible' já lida com a aparição do container pai
            }
        });
    });
    
    const graph = document.querySelector('.profile-chart');
    if(graph) graphObserver.observe(graph);
});