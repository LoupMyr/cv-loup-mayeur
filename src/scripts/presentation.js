document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    
    if (techItems.length === 0) return;
    
    let currentIndex = 0;
    
    function rotateTech() {
        // Masquer tous les éléments
        techItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Afficher l'élément courant
        techItems[currentIndex].classList.add('active');
        
        // Passer au suivant
        currentIndex = (currentIndex + 1) % techItems.length;
    }
    
    // Initialiser avec le premier élément
    rotateTech();
    
    // Démarrer la rotation automatique
    setInterval(rotateTech, 2000);
    
    // Animation d'apparition des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.presentation-name-highlight, .lead, .tech-carousel-container, .btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
});