// ============================================
// VARIABLES GLOBALES
// ============================================

let cart = [];
const scrollToTopBtn = document.getElementById('scrollToTop');

// ============================================
// SCROLL TO TOP FUNCTIONALITY
// ============================================

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// NAVBAR ACTIVE LINK HIGHLIGHTING
// ============================================

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('.parallax-section');
    parallaxElements.forEach(element => {
        let scrollPosition = window.pageYOffset;
        let elementOffset = element.offsetTop;
        let distance = scrollPosition - elementOffset;
        
        if (distance > -element.offsetHeight && distance < window.innerHeight) {
            element.style.backgroundPosition = `center ${distance * 0.5}px`;
        }
    });
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// ============================================
// INTERSECTION OBSERVER FOR STATS
// ============================================

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(element => {
                const target = parseInt(element.getAttribute('data-target'));
                animateCounter(element, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    observer.observe(statsSection);
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// ADD TO CART FUNCTIONALITY
// ============================================

function addToCart(serviceName, price) {
    const cartItem = {
        id: Date.now(),
        name: serviceName,
        price: price,
        quantity: 1
    };
    
    const existingItem = cart.find(item => item.name === serviceName);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push(cartItem);
    }
    
    showNotification(`${serviceName} ajouté au panier!`);
    updateCartDisplay();
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification-toast`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// CART DISPLAY UPDATE
// ============================================

function updateCartDisplay() {
    console.log('Panier actuel:', cart);
    console.log('Nombre d\'articles:', cart.length);
}

// ============================================
// FORM VALIDATION AND SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = this.querySelector('input[placeholder="Votre nom"]').value;
        const email = this.querySelector('input[placeholder="Votre email"]').value;
        const subject = this.querySelector('input[placeholder="Sujet"]').value;
        const message = this.querySelector('textarea[placeholder="Votre message"]').value;
        
        // Validation simple
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs', 'danger');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'danger');
            return;
        }
        
        // Simulation d'envoi
        showNotification('Message envoyé avec succès! Merci de nous avoir contacté.', 'success');
        this.reset();
    });
}

// ============================================
// ANIMATION ON SCROLL
// ============================================

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .contact-card, .stat-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
        observer.observe(element);
    });
};

// ============================================
// HOVER EFFECTS FOR SERVICE CARDS
// ============================================

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================

const lazyLoadImages = () => {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.onload = () => {
                    img.style.transition = 'opacity 0.5s ease-in';
                    img.style.opacity = '1';
                };
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-custom');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    }
});

// ============================================
// RESPONSIVE MENU TOGGLE
// ============================================

const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

if (navbarToggler && navbarCollapse) {
    // Vérifier si Bootstrap est disponible
    if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
        // Utiliser l'API Bootstrap pour le collapse
        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });
        
        // Toggle manuel du bouton
        navbarToggler.addEventListener('click', () => {
            bsCollapse.toggle();
        });
        
        // Fermer le menu quand on clique sur un lien interne (ancre)
        document.querySelectorAll('.navbar-nav .nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                if (navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            });
        });
        
        // Fermer le menu quand on clique en dehors de la navbar
        document.addEventListener('click', (e) => {
            const isClickInsideNavbar = navbarCollapse.contains(e.target) || navbarToggler.contains(e.target);
            if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
        
        // Fermer le menu avec la touche ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
        
        // Gérer le changement d'état du collapse
        navbarCollapse.addEventListener('show.bs.collapse', () => {
            navbarToggler.classList.add('collapsed');
            navbarToggler.setAttribute('aria-expanded', 'true');
        });
        
        navbarCollapse.addEventListener('hide.bs.collapse', () => {
            navbarToggler.classList.remove('collapsed');
            navbarToggler.setAttribute('aria-expanded', 'false');
        });
    } else {
        // Solution de secours sans Bootstrap
        console.log('Bootstrap non détecté, utilisation de la solution de secours');
        
        // Toggle manuel
        navbarToggler.addEventListener('click', (e) => {
            e.preventDefault();
            navbarCollapse.classList.toggle('show');
            const isShown = navbarCollapse.classList.contains('show');
            navbarToggler.classList.toggle('collapsed', !isShown);
            navbarToggler.setAttribute('aria-expanded', isShown);
        });
        
        // Fermer sur les liens internes
        document.querySelectorAll('.navbar-nav .nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.classList.add('collapsed');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Fermer au clic extérieur
        document.addEventListener('click', (e) => {
            const isClickInsideNavbar = navbarCollapse.contains(e.target) || navbarToggler.contains(e.target);
            if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.add('collapsed');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Fermer avec ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.classList.add('collapsed');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // ESC: Fermer les modales
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
    }
    
    // Ctrl+K: Scroll to top
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        scrollToTopBtn.click();
    }
});

// ============================================
// DARK MODE TOGGLE (OPTIONNEL)
// ============================================

const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
};

// Charger la préférence de mode sombre
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ============================================
// PERFORMANCE: DEBOUNCE FUNCTION
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// SMOOTH ANIMATIONS ON PAGE LOAD
// ============================================

window.addEventListener('load', () => {
    animateOnScroll();
    lazyLoadImages();
    
    // Animation du titre du héros
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'fadeInUp 0.8s ease-out';
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeInUp 0.8s ease-out 0.2s both';
    }
});

// ============================================
// MOBILE TOUCH INTERACTIONS
// ============================================

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        // Swipe gauche
        console.log('Swipe gauche détecté');
    }
    if (touchEndX - touchStartX > 50) {
        // Swipe droite
        console.log('Swipe droite détecté');
    }
}

// ============================================
// INTERSECTION OBSERVER FOR FADE IN
// ============================================

const fadeInElements = document.querySelectorAll('.service-card, .about-image, .contact-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease-out';
    fadeInObserver.observe(element);
});

// ============================================
// DYNAMIC YEAR IN FOOTER
// ============================================

const yearElement = document.querySelector('.footer');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    const footerText = yearElement.innerHTML;
    yearElement.innerHTML = footerText.replace('2024', currentYear);
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log('%cBienvenue sur CarWash Pro!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cMerci de votre visite!', 'color: #0066cc; font-size: 14px;');

// ============================================
// ACCESSIBILITY: FOCUS MANAGEMENT
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Temps de chargement de la page: ' + pageLoadTime + 'ms');
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Site CarWash Pro chargé avec succès!');
    
    // Initialiser les tooltips Bootstrap si disponibles
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// ============================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ============================================

window.CarWashApp = {
    addToCart: addToCart,
    showNotification: showNotification,
    scrollToTop: () => scrollToTopBtn.click(),
    toggleDarkMode: toggleDarkMode,
    getCart: () => cart
};
