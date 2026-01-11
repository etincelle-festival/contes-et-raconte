/* ===================================
   FESTIVAL CONTES ET RACONTE - JAVASCRIPT
   =================================== */

// ===================================
// VARIABLES GLOBALES
// ===================================

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

// ===================================
// MENU MOBILE
// ===================================

// Toggle menu mobile
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fermer le menu lors du clic en dehors
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ===================================
// SMOOTH SCROLL
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignorer les liens vides ou juste "#"
        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Ajouter ombre au scroll
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===================================
// FILTRES PROGRAMME (pour programme.html)
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const eventItems = document.querySelectorAll('.event-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            eventItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===================================
// RECHERCHE PROGRAMME
// ===================================

const searchInput = document.querySelector('.search-input');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        eventItems.forEach(item => {
            const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const artist = item.querySelector('.event-artist')?.textContent.toLowerCase() || '';
            const description = item.querySelector('.event-description')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(searchTerm) || 
                          artist.includes(searchTerm) || 
                          description.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
}

// ===================================
// GALERIE PHOTOS (LIGHTBOX)
// ===================================

class Lightbox {
    constructor() {
        this.galleryImages = document.querySelectorAll('.gallery-item img, .artist-photo');
        this.init();
    }

    init() {
        if (this.galleryImages.length === 0) return;

        // Créer le lightbox
        this.createLightbox();

        // Ajouter les événements
        this.galleryImages.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => this.openLightbox(img.src, index));
        });
    }

    createLightbox() {
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-backdrop"></div>
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Fermer">&times;</button>
                    <button class="lightbox-prev" aria-label="Précédent">&lsaquo;</button>
                    <img src="" alt="">
                    <button class="lightbox-next" aria-label="Suivant">&rsaquo;</button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = this.lightbox.querySelector('img');
        this.closeBtn = this.lightbox.querySelector('.lightbox-close');
        this.prevBtn = this.lightbox.querySelector('.lightbox-prev');
        this.nextBtn = this.lightbox.querySelector('.lightbox-next');
        this.backdrop = this.lightbox.querySelector('.lightbox-backdrop');

        // Événements
        this.closeBtn.addEventListener('click', () => this.closeLightbox());
        this.backdrop.addEventListener('click', () => this.closeLightbox());
        this.prevBtn.addEventListener('click', () => this.navigateLightbox(-1));
        this.nextBtn.addEventListener('click', () => this.navigateLightbox(1));

        // Clavier
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
            if (e.key === 'ArrowRight') this.navigateLightbox(1);
        });

        // Ajouter les styles CSS pour le lightbox
        this.addLightboxStyles();
    }

    openLightbox(src, index) {
        this.currentIndex = index;
        this.lightboxImg.src = src;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    navigateLightbox(direction) {
        this.currentIndex += direction;
        
        if (this.currentIndex < 0) {
            this.currentIndex = this.galleryImages.length - 1;
        } else if (this.currentIndex >= this.galleryImages.length) {
            this.currentIndex = 0;
        }
        
        this.lightboxImg.src = this.galleryImages[this.currentIndex].src;
    }

    addLightboxStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
            }

            .lightbox.active {
                display: flex;
            }

            .lightbox-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                cursor: pointer;
            }

            .lightbox-content {
                position: relative;
                z-index: 2;
                max-width: 90%;
                max-height: 90%;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
            }

            .lightbox-close,
            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                padding: 1rem;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .lightbox-close:hover,
            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }

            .lightbox-close {
                top: 20px;
                right: 20px;
            }

            .lightbox-prev {
                left: 20px;
            }

            .lightbox-next {
                right: 20px;
            }

            @media (max-width: 768px) {
                .lightbox-close,
                .lightbox-prev,
                .lightbox-next {
                    width: 40px;
                    height: 40px;
                    font-size: 1.5rem;
                    padding: 0.5rem;
                }

                .lightbox-close {
                    top: 10px;
                    right: 10px;
                }

                .lightbox-prev {
                    left: 10px;
                }

                .lightbox-next {
                    right: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialiser la lightbox quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
});

// ===================================
// ACCORDION (pour artistes/FAQ)
// ===================================

const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const accordionContent = accordionItem.querySelector('.accordion-content');
        const isActive = accordionItem.classList.contains('active');

        // Fermer tous les accordions
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Ouvrir l'accordion cliqué si ce n'était pas déjà actif
        if (!isActive) {
            accordionItem.classList.add('active');
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        }
    });
});

// ===================================
// ANIMATION AU SCROLL
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.event-card, .artist-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Style pour les éléments animés
const animationStyle = document.createElement('style');
animationStyle.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyle);

// ===================================
// BOUTON RETOUR EN HAUT
// ===================================

// Créer le bouton
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Retour en haut');
document.body.appendChild(backToTopButton);

// Styles pour le bouton
const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }

    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(backToTopStyle);

// Afficher/masquer le bouton selon le scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Action du bouton
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// FORMULAIRE DE CONTACT (si présent)
// ===================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupérer les valeurs
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validation simple
        if (!data.name || !data.email || !data.message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Veuillez entrer un email valide', 'error');
            return;
        }
        
        // Simulation d'envoi (à remplacer par votre logique d'envoi)
        showNotification('Message envoyé avec succès !', 'success');
        contactForm.reset();
    });
}

// ===================================
// SYSTÈME DE NOTIFICATIONS
// ===================================

function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Styles pour les notifications
    if (!document.querySelector('#notification-styles')) {
        const notificationStyle = document.createElement('style');
        notificationStyle.id = 'notification-styles';
        notificationStyle.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 30px;
                padding: 1rem 1.5rem;
                background: white;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 300px;
            }

            .notification-success {
                border-left: 4px solid #10b981;
            }

            .notification-error {
                border-left: 4px solid #ef4444;
            }

            .notification-info {
                border-left: 4px solid #3b82f6;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            @media (max-width: 768px) {
                .notification {
                    right: 15px;
                    left: 15px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(notificationStyle);
    }
    
    // Animer l'apparition
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// COMPTE À REBOURS (optionnel)
// ===================================

function initCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;

    const targetDate = new Date('2026-04-01T18:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = '<p>Le festival a commencé !</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-value">${days}</span>
                <span class="countdown-label">Jours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${hours}</span>
                <span class="countdown-label">Heures</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${seconds}</span>
                <span class="countdown-label">Secondes</span>
            </div>
        `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialiser le compte à rebours
document.addEventListener('DOMContentLoaded', initCountdown);

// ===================================
// CHARGEMENT LAZY DES IMAGES
// ===================================

if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback pour les navigateurs qui ne supportent pas loading="lazy"
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// FILTRES PAGE PROGRAMME
// ===================================

// Fonction pour initialiser les filtres de la page programme
function initProgrammeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-input');
    const eventItems = document.querySelectorAll('.event-item');
    
    if (!filterBtns.length || !eventItems.length) return;
    
    let currentFilter = 'all';
    let searchTerm = '';
    
    // Fonction pour appliquer les filtres
    function applyFilters() {
        eventItems.forEach(item => {
            const category = item.dataset.category;
            const text = item.textContent.toLowerCase();
            
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = searchTerm === '' || text.includes(searchTerm);
            
            if (matchesFilter && matchesSearch) {
                item.classList.remove('hidden');
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
                item.classList.add('hidden');
            }
        });
        
        // Masquer les jours vides
        document.querySelectorAll('.day-group').forEach(dayGroup => {
            const visibleEvents = dayGroup.querySelectorAll('.event-item.visible');
            if (visibleEvents.length === 0) {
                dayGroup.style.display = 'none';
            } else {
                dayGroup.style.display = 'block';
            }
        });
        
        // Masquer les mois vides
        document.querySelectorAll('.month-group').forEach(monthGroup => {
            const visibleDays = monthGroup.querySelectorAll('.day-group[style="display: block;"], .day-group:not([style])');
            if (visibleDays.length === 0) {
                monthGroup.style.display = 'none';
            } else {
                monthGroup.style.display = 'block';
            }
        });
    }
    
    // Event listeners pour les boutons de filtre
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            btn.classList.add('active');
            
            // Mettre à jour le filtre actuel
            currentFilter = btn.dataset.filter;
            
            // Appliquer les filtres
            applyFilters();
        });
    });
    
    // Event listener pour la recherche
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchTerm = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }
}

// Initialiser les filtres si on est sur la page programme
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.programme-section')) {
        initProgrammeFilters();
    }
});

// ===================================
// COMPTE À REBOURS
// ===================================

function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Date de début du festival : 31 mars 2026
    const festivalDate = new Date('2026-03-31T15:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = festivalDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = '<p class="countdown-ended">Le festival a commencé ! 🎭</p>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-value">${days}</span>
                <span class="countdown-label">Jours</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${hours}</span>
                <span class="countdown-label">Heures</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${minutes}</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${seconds}</span>
                <span class="countdown-label">Secondes</span>
            </div>
        `;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialiser le compte à rebours
document.addEventListener('DOMContentLoaded', initCountdown);

// ====================================
// FAQ ACCORDION
// ====================================

function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Fermer toutes les autres FAQ
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Ouvrir celle cliquée si elle n'était pas déjà ouverte
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Initialiser la FAQ au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.faq-section')) {
        initFAQ();
    }
});


// ===================================
// INITIALISATION
// ===================================
// TODO :delete logs
console.log('🎭 Festival Contes et Raconte - Script chargé avec succès');
