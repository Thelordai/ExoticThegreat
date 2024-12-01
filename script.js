// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            navLinks.classList.remove('active');
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
    });
    gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3
    });
});

// Hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorFollower.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorFollower.classList.remove('cursor-hover');
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .member-card, .map-card, .tutorial-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Enhanced parallax effect for hero section
const heroContent = document.querySelector('.hero-content');
const parallaxElements = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        gsap.to(el, {
            y: yPos,
            duration: 0.1,
            ease: 'power1.out'
        });
    });
});

// Magnetic effect for buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) * 0.1;
        const deltaY = (y - centerY) * 0.1;
        
        gsap.to(button, {
            x: deltaX,
            y: deltaY,
            duration: 0.4,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'elastic.out(1, 0.3)'
        });
    });
});

// Smooth reveal animations
gsap.utils.toArray('.fade-in').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Glitch effect for hero title
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    setInterval(() => {
        glitchText.classList.add('active');
        setTimeout(() => {
            glitchText.classList.remove('active');
        }, 200);
    }, 3000);
}

// Performance optimization using requestAnimationFrame
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateOnScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function updateOnScroll() {
    const scrolled = window.pageYOffset;
    
    // Navbar background update
    if (scrolled > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Parallax updates
    parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
}

// Preload critical images
const preloadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '50px'
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(img => imageObserver.observe(img));
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
});

// Add hover effect to cards
document.querySelectorAll('.member-card, .map-card, .tutorial-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
