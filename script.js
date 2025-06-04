// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Close mobile menu when clicking on buttons
document.querySelectorAll('.btn-mobile-primary, .btn-mobile-secondary').forEach(button => {
    button.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        header.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Stats counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(statNumber => {
                const target = parseInt(statNumber.getAttribute('data-target'));
                animateCounter(statNumber, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Scroll animations
const scrollAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add scroll animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.project-card, .performer-card, .feature-card');
    cards.forEach(card => {
        card.classList.add('fade-in');
        scrollAnimationObserver.observe(card);
    });

    // Add slide-in animations to AI section
    const aiText = document.querySelector('.ai-text');
    const aiVisual = document.querySelector('.ai-visual');
    
    if (aiText) {
        aiText.classList.add('slide-in-left');
        scrollAnimationObserver.observe(aiText);
    }
    
    if (aiVisual) {
        aiVisual.classList.add('slide-in-right');
        scrollAnimationObserver.observe(aiVisual);
    }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-bg-animation');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Hero title animation (removed typing effect for better performance)

// Button click animations
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Skill bars animation
const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                bar.style.animation = 'skillProgress 2s ease-out forwards';
            });
            skillBarsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aiDashboard = document.querySelector('.ai-dashboard');
if (aiDashboard) {
    skillBarsObserver.observe(aiDashboard);
}

// Progressive loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading on DOM content loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Performance optimization - throttle scroll events
function throttle(func, wait) {
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

// Throttled scroll handler
const throttledScrollHandler = throttle(() => {
    const scrolled = window.pageYOffset;
    
    // Header opacity
    const header = document.querySelector('.header');
    if (header) {
        const opacity = Math.min(0.98, 0.8 + (scrolled / 1000));
        header.style.background = `rgba(26, 26, 26, ${opacity})`;
    }
    
    // Parallax for floating cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.05);
        card.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        // Easter egg activated
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        // Show special message
        const message = document.createElement('div');
        message.innerHTML = '🎉 Вы нашли секретный код! HappyStaff приветствует гиков! 🚀';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--gradient-primary);
            color: var(--text-dark);
            padding: 2rem;
            border-radius: 20px;
            font-weight: bold;
            z-index: 10000;
            animation: bounce 0.5s ease-in-out;
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
        
        konamiCode = [];
    }
});

// Add bounce animation for easter egg
const bounceCSS = `
@keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
        transform: translate(-50%, -50%) translateY(0);
    }
    40%, 43% {
        transform: translate(-50%, -50%) translateY(-20px);
    }
    70% {
        transform: translate(-50%, -50%) translateY(-10px);
    }
    90% {
        transform: translate(-50%, -50%) translateY(-4px);
    }
}
`;

const bounceStyle = document.createElement('style');
bounceStyle.textContent = bounceCSS;
document.head.appendChild(bounceStyle);

// Form validation and submission (for future contact forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// Add error styles for form validation
const formErrorCSS = `
.error {
    border-color: #ff6b6b !important;
    box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
}
`;

const formStyle = document.createElement('style');
formStyle.textContent = formErrorCSS;
document.head.appendChild(formStyle);

// Console message for developers
console.log(`
🚀 HappyStaff Developer Console
═══════════════════════════════
Добро пожаловать в консоль разработчика HappyStaff!
Если вы видите это сообщение, значит вы из наших - welcome aboard! 🎯

💡 Интересные факты:
- Эта страница использует современные CSS Grid и Flexbox
- Анимации оптимизированы для производительности 
- Код написан с любовью к деталям ❤️
- Попробуйте ввести код Konami! ↑↑↓↓←→←→BA

📧 Хотите присоединиться к команде? Напишите нам!
`);

// Slider functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.story-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-slide functionality
setInterval(() => {
    changeSlide(1);
}, 5000);

// Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    if (searchInput && suggestionTags) {
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                searchInput.value = tag.textContent;
                searchInput.focus();
            });
        });
    }
});

// Enhanced button interactions
document.querySelectorAll('.btn-view-all').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            if (loadTime > 3000) {
                console.warn(`Время загрузки: ${loadTime}ms - можно оптимизировать!`);
            } else {
                console.log(`⚡ Отличное время загрузки: ${loadTime}ms`);
            }
        }, 0);
    });
} 