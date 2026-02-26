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

// Form submission avec FormSubmit (AJAX)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        console.log('📧 Formulaire en cours d\'envoi...');
        console.log('Données du formulaire:', data);
        console.log('Email de destination: billal.elamrani95130@gmail.com');
        
        // Show loading state
        submitBtn.textContent = currentLang === 'fr' ? 'Envoi en cours...' : 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        try {
            // Envoyer le formulaire via AJAX à FormSubmit
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            console.log('✅ Réponse reçue:', response.status);
            
            if (response.ok) {
                // Succès - Afficher message de confirmation
                submitBtn.textContent = currentLang === 'fr' ? '✓ Message envoyé !' : '✓ Message sent!';
                submitBtn.style.background = '#10b981';
                console.log('✅ Email envoyé avec succès à billal.elamrani95130@gmail.com');
                
                // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                }, 3000);
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
            
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi:', error);
            
            // Afficher message d'erreur
            submitBtn.textContent = currentLang === 'fr' ? '✗ Erreur d\'envoi' : '✗ Error sending';
            submitBtn.style.background = '#ef4444';
            
            // Réinitialiser après 3 secondes
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '';
            }, 3000);
        }
    });
}

// Removed parallax effect to prevent layout issues

// Typing effect for hero title (runs once on page load)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    // Save the original text
    const originalText = heroTitle.textContent;
    
    // Clear the text initially
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1'; // Ensure visibility
    heroTitle.classList.add('typing'); // Add blinking cursor
    
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < originalText.length) {
            heroTitle.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 40); // Speed of typing (40ms per character)
        } else {
            // Remove blinking cursor when typing is done
            setTimeout(() => {
                heroTitle.classList.remove('typing');
            }, 500);
        }
    }
    
    // Start typing effect after hero section is visible
    setTimeout(typeWriter, 800);
}

// Cursor follow effect désactivé (curseur personnalisé utilisé via CSS)
// let cursorDot = null;
// if (window.innerWidth > 768) {
//     cursorDot = document.createElement('div');
//     cursorDot.style.cssText = `
//         width: 8px;
//         height: 8px;
//         background: var(--primary-color);
//         border-radius: 50%;
//         position: fixed;
//         pointer-events: none;
//         z-index: 9999;
//         opacity: 0;
//         transition: opacity 0.3s ease;
//     `;
//     document.body.appendChild(cursorDot);

//     let mouseX = 0, mouseY = 0;
//     let dotX = 0, dotY = 0;

//     document.addEventListener('mousemove', (e) => {
//         mouseX = e.clientX;
//         mouseY = e.clientY;
//         cursorDot.style.opacity = '0.5';
//     });

//     function animateCursor() {
//         dotX += (mouseX - dotX) * 0.2;
//         dotY += (mouseY - dotY) * 0.2;
        
//         if (cursorDot) {
//             cursorDot.style.left = dotX + 'px';
//             cursorDot.style.top = dotY + 'px';
//         }
        
//         requestAnimationFrame(animateCursor);
//     }
//     animateCursor();

//     document.addEventListener('mouseleave', () => {
//         if (cursorDot) cursorDot.style.opacity = '0';
//     });
// }

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

// Certification cards staggered animation
const certificationCards = document.querySelectorAll('.certification-card');
const certificationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
            certificationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

certificationCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px) scale(0.95)';
    card.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    certificationObserver.observe(card);
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

// Copy to clipboard functionality
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const textToCopy = button.getAttribute('data-copy');
        
        try {
            await navigator.clipboard.writeText(textToCopy);
            
            // Visual feedback
            const icon = button.querySelector('i');
            const originalClass = icon.className;
            
            // Change to check icon
            button.classList.add('copied');
            icon.className = 'fas fa-check';
            
            // Reset after 2 seconds
            setTimeout(() => {
                button.classList.remove('copied');
                icon.className = originalClass;
            }, 2000);
            
        } catch (err) {
            console.error('Erreur de copie:', err);
            // Fallback pour les anciens navigateurs
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Visual feedback
            button.classList.add('copied');
            setTimeout(() => button.classList.remove('copied'), 2000);
        }
    });
});

// Console message for developers
console.log('%c👋 Hello Developer!', 'font-size: 20px; color: #22d3ee; font-weight: bold;');
console.log('%cLike what you see? Let\'s work together!', 'font-size: 14px; color: #6b7280;');
console.log('%cContact: billal.elamrani95130@gmail.com', 'font-size: 14px; color: #22d3ee;');

// ===== PROJECT MODAL =====
const projectsData = {
    0: {
        title: { fr: 'Portfolio Personnel', en: 'Personal Portfolio' },
        subtitle: { fr: 'Développement Web & Design', en: 'Web Development & Design' },
        tags: ['HTML/CSS', 'JavaScript', 'Design', 'SEO', 'Performance'],
        images: ['https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=700&h=467&fit=crop&fm=webp&q=80'],
        context: {
            fr: "Projet personnel conçu de A à Z pour présenter mon profil, mes compétences et mes réalisations de manière professionnelle et impactante.",
            en: "Personal project designed from scratch to present my profile, skills, and achievements in a professional and impactful way."
        },
        mission: {
            fr: "Conception UI/UX complète, développement front-end, intégration du mode sombre/clair, support bilingue FR/EN, animations CSS, optimisation SEO et performance (images WebP, lazy loading, Google Fonts asynchrones).",
            en: "Full UI/UX design, front-end development, dark/light mode integration, bilingual FR/EN support, CSS animations, SEO and performance optimization (WebP images, lazy loading, async Google Fonts)."
        },
        results: {
            fr: "Site entièrement responsive, score de performance élevé, référencement optimisé et déployé sur GitHub Pages.",
            en: "Fully responsive site, high performance score, optimized SEO, deployed on GitHub Pages."
        },
        link: 'https://github.com/elamrani-billal/portfolio',
        linkLabel: { fr: 'Voir sur GitHub', en: 'View on GitHub' }
    },
    1: {
        title: { fr: 'Campagne Communication Digitale', en: 'Digital Communication Campaign' },
        subtitle: { fr: 'Stratégie & Community Management', en: 'Strategy & Community Management' },
        tags: ['Stratégie', 'Design', 'Réseaux Sociaux', 'Copywriting', 'Canva'],
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=467&fit=crop&fm=webp&q=80'],
        context: {
            fr: "Projet universitaire — élaboration d'une stratégie de communication digitale complète pour une marque locale cherchant à développer sa présence en ligne.",
            en: "Academic project — developing a complete digital communication strategy for a local brand seeking to grow its online presence."
        },
        mission: {
            fr: "Analyse de la cible et du marché, définition des messages clés, création de visuels et de contenus pour les réseaux sociaux (Instagram, LinkedIn), planification éditoriale et mesure des KPIs.",
            en: "Target and market analysis, definition of key messages, creation of visuals and content for social media (Instagram, LinkedIn), editorial planning and KPI measurement."
        },
        results: {
            fr: "Augmentation significative de la visibilité de la marque, hausse de l'engagement sur les publications et mise en place d'une identité de marque cohérente.",
            en: "Significant increase in brand visibility, higher post engagement, and establishment of a consistent brand identity."
        },
        link: null,
        linkLabel: null
    },
    2: {
        title: { fr: 'Site E-commerce', en: 'E-commerce Website' },
        subtitle: { fr: 'WordPress & WooCommerce', en: 'WordPress & WooCommerce' },
        tags: ['WordPress', 'WooCommerce', 'SEO', 'UX/UI', 'Design'],
        images: ['https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&h=467&fit=crop&fm=webp&q=80'],
        context: {
            fr: "Projet de développement web — création d'une boutique en ligne fonctionnelle pour une structure souhaitant commercialiser ses produits directement via internet.",
            en: "Web development project — creation of a functional online store for an organization wanting to sell its products directly online."
        },
        mission: {
            fr: "Installation et configuration de WordPress et WooCommerce, création d'un design personnalisé en accord avec l'identité visuelle, optimisation SEO on-page et paramétrage des moyens de paiement.",
            en: "Installation and configuration of WordPress and WooCommerce, creation of a custom design aligned with the visual identity, on-page SEO optimization and payment method configuration."
        },
        results: {
            fr: "Boutique en ligne opérationnelle, navigation intuitive et optimisée pour la conversion, avec une architecture de contenu favorable au référencement naturel.",
            en: "Fully operational online store, intuitive navigation optimized for conversion, with a content architecture favorable to SEO."
        },
        link: null,
        linkLabel: null
    },
    3: {
        title: { fr: 'Contenu Vidéo Créatif', en: 'Creative Video Content' },
        subtitle: { fr: 'Production & Montage Vidéo', en: 'Video Production & Editing' },
        tags: ['Vidéo', 'Montage', 'Motion Design', 'Storytelling', 'Réseaux Sociaux'],
        images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=700&h=467&fit=crop&fm=webp&q=80'],
        context: {
            fr: "Production de contenus vidéo engageants pour les réseaux sociaux d'une marque, dans le but d'augmenter la portée organique et de fidéliser la communauté.",
            en: "Production of engaging video content for a brand's social media to increase organic reach and build community loyalty."
        },
        mission: {
            fr: "Conception du scénario et du storyboard, tournage, montage vidéo avec Adobe Premiere Pro, ajout d'animations et d'effets motion design, adaptation des formats pour chaque plateforme (Reels, TikTok, YouTube Shorts).",
            en: "Script and storyboard conception, filming, video editing with Adobe Premiere Pro, addition of motion design animations and effects, format adaptation for each platform (Reels, TikTok, YouTube Shorts)."
        },
        results: {
            fr: "Contenus engageants avec un taux de visionnage et d'interaction supérieur à la moyenne, contribuant à la croissance de la communauté en ligne.",
            en: "Engaging content with above-average view and interaction rates, contributing to online community growth."
        },
        link: null,
        linkLabel: null
    },
    4: {
        title: { fr: 'Événement Digital', en: 'Digital Event' },
        subtitle: { fr: 'Organisation & Communication Événementielle', en: 'Event Organisation & Communication' },
        tags: ['Événementiel', 'Live', 'Promotion', 'Coordination', 'Communication'],
        images: ['https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=700&h=467&fit=crop&fm=webp&q=80'],
        context: {
            fr: "Organisation d'un événement en ligne (webinaire/conférence digitale) impliquant la coordination de plusieurs intervenants et la gestion de la communication avant, pendant et après l'événement.",
            en: "Organization of an online event (webinar/digital conference) involving the coordination of multiple speakers and management of communication before, during and after the event."
        },
        mission: {
            fr: "Définition du concept et du programme, création des supports de communication (visuels, emailings, posts réseaux sociaux), coordination logistique des intervenants, animation live et modération des échanges.",
            en: "Definition of concept and program, creation of communication materials (visuals, emails, social media posts), logistical coordination of speakers, live facilitation and moderation."
        },
        results: {
            fr: "Forte participation du public cible, retours très positifs des intervenants et des participants, et couverture sur les réseaux sociaux dépassant les objectifs fixés.",
            en: "Strong attendance from the target audience, very positive feedback from speakers and participants, and social media coverage exceeding set goals."
        },
        link: null,
        linkLabel: null
    },
    6: {
        title: { fr: 'Sensibilité Jeunesse — TikTok', en: 'Sensibilité Jeunesse — TikTok' },
        subtitle: { fr: 'Community Management & Création de Contenu', en: 'Community Management & Content Creation' },
        tags: ['TikTok', 'Community Management', 'Storytelling', 'Algorithme', 'Sensibilisation'],
        images: [],
        context: {
            fr: "Projet personnel — création et gestion d'un compte TikTok de sensibilisation destiné à un public jeune. Les vidéos mettaient en scène des scénarios du quotidien pour aborder des sujets de société de manière accessible et engageante.",
            en: "Personal project — creation and management of a TikTok awareness account aimed at a young audience. Videos staged everyday scenarios to address social topics in an accessible and engaging way."
        },
        mission: {
            fr: "Conception des scénarios, tournage, montage et publication des vidéos de manière régulière. Analyse des statistiques TikTok (taux de complétion, portée, heures de publication optimales) pour ajuster la stratégie de contenu. Maîtrise des codes de la plateforme : hook, rythme de montage, textes à l'écran, sons tendance.",
            en: "Scenario writing, filming, editing and regular publication of videos. Analysis of TikTok statistics (completion rate, reach, optimal posting times) to adjust the content strategy. Mastery of platform codes: hook, editing pace, on-screen text, trending sounds."
        },
        results: {
            fr: "Jusqu'à 15 000 vues sur les meilleures vidéos, avec une moyenne de 300 à 1 000 vues par publication. Compréhension concrète du fonctionnement de l'algorithme TikTok, de l'importance du hook et de l'optimisation des heures de publication.",
            en: "Up to 15,000 views on best-performing videos, with an average of 300 to 1,000 views per post. Practical understanding of the TikTok algorithm, the importance of the hook, and posting time optimization."
        },
        link: null,
        linkLabel: null
    },
    5: {
        title: { fr: 'Infographies Processus IFFP', en: 'IFFP Process Infographics' },
        subtitle: { fr: 'Communication Visuelle — Mission réelle', en: 'Visual Communication — Real Mission' },
        tags: ['Infographie', 'Design', 'Communication Visuelle', 'Canva', 'Processus'],
        images: [
            'images/projet/ETAPES PROSPECTION COMMERCIAL.png',
            "images/projet/ETAPES POUR LE PROCESSUS D'ADMISSION.png",
            "images/projet/ETAPES PROCESSUS D'ADMISSION PARTIE 2.png",
            "images/projet/ETAPES Argumentaire entretien préalable visio- Candidat.png"
        ],
        context: {
            fr: "Mission réalisée pour l'IFFP (Institut de Formation de la Formation Professionnelle). L'objectif était de formaliser et de rendre visuels des processus internes complexes pour faciliter la formation et l'onboarding des équipes.",
            en: "Mission carried out for the IFFP (Professional Training Institute). The goal was to formalize and visualize complex internal processes to facilitate team training and onboarding."
        },
        mission: {
            fr: "Création de 4 infographies visuelles : (1) le processus de prospection commerciale, (2 & 3) les étapes du processus d'admission en deux parties, et (4) l'argumentaire d'entretien préalable en visio-conférence pour les candidats. Travail de mise en page, hiérarchisation de l'information et cohérence graphique.",
            en: "Creation of 4 visual infographics: (1) the sales prospecting process, (2 & 3) the admission process steps in two parts, and (4) the pre-interview argument guide for video conference candidates. Layout work, information hierarchy, and graphic consistency."
        },
        results: {
            fr: "Des supports de communication interne clairs, professionnels et directement exploitables par les équipes commerciales et pédagogiques de l'IFFP pour structurer leurs démarches.",
            en: "Clear, professional internal communication materials directly usable by IFFP's sales and educational teams to structure their processes."
        },
        link: null,
        linkLabel: null
    }
};

const modalOverlay = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    const lang = currentLang || 'fr';

    // Gallery
    const gallery = document.getElementById('modalGallery');
    gallery.innerHTML = '';
    data.images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = data.title[lang];
        img.loading = 'lazy';
        gallery.appendChild(img);
    });
    gallery.className = 'modal-gallery' + (data.images.length === 1 ? ' single' : '');

    // Text content
    document.getElementById('modalTitle').textContent = data.title[lang];
    document.getElementById('modalSubtitle').textContent = data.subtitle[lang];
    document.getElementById('modalContextText').textContent = data.context[lang];
    document.getElementById('modalMissionText').textContent = data.mission[lang];
    document.getElementById('modalResultsText').textContent = data.results[lang];

    // Tags
    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = '';
    data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        tagsEl.appendChild(span);
    });

    // Link
    const linkEl = document.getElementById('modalLink');
    if (data.link) {
        linkEl.href = data.link;
        document.getElementById('modalLinkLabel').textContent = data.linkLabel[lang];
        linkEl.style.display = 'inline-flex';
    } else {
        linkEl.style.display = 'none';
    }

    // Update modal section labels for language
    document.querySelectorAll('#projectModal [data-en][data-fr]').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Open modal on card click
document.querySelectorAll('.project-card[data-project-id]').forEach(card => {
    card.addEventListener('click', () => {
        openModal(parseInt(card.getAttribute('data-project-id')));
    });
});

// Close on button
modalClose.addEventListener('click', closeModal);

// Close on overlay click
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
});