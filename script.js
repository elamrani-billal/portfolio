// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to DARK mode
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Initialize icon
updateThemeIcon();

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Language Toggle
const langToggle = document.getElementById('langToggle');
const langText = langToggle.querySelector('.lang-text');

// Check for saved language preference or default to FRENCH
let currentLang = localStorage.getItem('language') || 'fr';

// Update all translatable elements
function updateLanguage(lang) {
    currentLang = lang;
    langText.textContent = lang.toUpperCase();
    
    // Update all elements with data-en and data-fr attributes
    document.querySelectorAll('[data-en][data-fr]').forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update placeholders for form inputs
    document.querySelectorAll('[data-placeholder-en][data-placeholder-fr]').forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Save preference
    localStorage.setItem('language', lang);
}

// Initialize language
updateLanguage(currentLang);

// Language toggle functionality
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    updateLanguage(newLang);
    
    // Add animation effect
    langToggle.style.transform = 'scale(1.1) rotate(360deg)';
    setTimeout(() => {
        langToggle.style.transform = '';
    }, 300);
});

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger bars
    const bars = hamburger.querySelectorAll('.bar');
    if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply fade-in effect to elements
const fadeElements = document.querySelectorAll('.project-card, .skill-card, .about-content, .contact-content');
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(element);
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.style.color = 'var(--primary-color)';
        } else if (navLink) {
            navLink.style.color = '';
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Navbar background on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    // Hide navbar on scroll down, show on scroll up (optional)
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitBtn.textContent = '✓ Message Sent!';
            submitBtn.style.background = '#10b981';
            
            // Reset form after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
});

// Typing effect for hero title (optional)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Cursor follow effect (optional subtle effect)
let cursorDot = null;
if (window.innerWidth > 768) {
    cursorDot = document.createElement('div');
    cursorDot.style.cssText = `
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.opacity = '0.5';
    });

    function animateCursor() {
        dotX += (mouseX - dotX) * 0.2;
        dotY += (mouseY - dotY) * 0.2;
        
        if (cursorDot) {
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.addEventListener('mouseleave', () => {
        if (cursorDot) cursorDot.style.opacity = '0';
    });
}

// Add hover effects to buttons
const buttons = document.querySelectorAll('.btn, .social-link, .project-card');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Animate skill cards on scroll
const skillCards = document.querySelectorAll('.skill-card');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(card);
});

// Project cards staggered animation
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    projectObserver.observe(card);
});

// Prevent scroll behavior issues
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Initialize all animations on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    highlightNavigation();
});

// Performance: Reduce animations on lower-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.2s');
}

// Console message for developers
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #22d3ee; font-weight: bold;');
console.log('%cLike what you see? Let\'s work together!', 'font-size: 14px; color: #6b7280;');
console.log('%cContact: billal.elamrani95130@gmail.com', 'font-size: 14px; color: #22d3ee;');