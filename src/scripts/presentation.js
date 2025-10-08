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
    
    // Observer les éléments animables
    const animatedElements = document.querySelectorAll('.presentation-name-highlight, .lead, .tech-carousel-container, .btn');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
    
    // Animation des particules flottantes
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const delay = index * 0.5;
        particle.style.animationDelay = `${delay}s`;
    });
});

// Effet parallaxe sur les particules
window.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.02;
        const x = (mouseX - 0.5) * speed * 50;
        const y = (mouseY - 0.5) * speed * 50;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});