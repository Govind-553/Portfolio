// Function to handle the typing and erasing effect for "about-me" text.
function changeAboutMeText() {
    const aboutMeTexts = ["Tech Enthusiast", "Creative Problem Solver", "Web Developer"];
    const typingSpeed = 100;
    const eraseSpeed = 50;
    const pauseTime = 1500;
    const aboutMeElement = document.querySelector('.about-me');
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = aboutMeTexts[textIndex];
        
        // Typing
        if (!isDeleting && charIndex < currentText.length) {
            aboutMeElement.textContent += currentText[charIndex];
            charIndex++;
            setTimeout(type, typingSpeed);
        }
        // Erasing
        else if (isDeleting && charIndex > 0) {
            aboutMeElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, eraseSpeed);
        }
        // Switching mode
        else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                textIndex = (textIndex + 1) % aboutMeTexts.length;
            }
            setTimeout(type, pauseTime);
        }
    }
    type();
}

// Function to handle the mobile menu toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const menuToggle = document.querySelector('.nav-toggle');

    navMenu.classList.toggle('active');

    if (navMenu.classList.contains('active')) {
        menuToggle.textContent = "✖";
    } else {
        menuToggle.textContent = "☰";
    }
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.textContent = "☰";
        }
    });
});

// Event listener for Dark Mode toggle, form submission, image modal, and scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const contactForm = document.querySelector('#contact form');
    const formMessage = document.querySelector('.form-message');
    
    // Image Modal elements
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('full-image');
    const modalClose = document.querySelector('.modal-close');
    const certCards = document.querySelectorAll('.cert-card');

    // Dark Mode Toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-sun', isDarkMode);
                icon.classList.toggle('fa-moon', !isDarkMode);
            }
        });
    }

    // Handle form submission (using Formspree)
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const form = e.target;
            const data = new FormData(form);
            const action = form.action;
            
            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formMessage.textContent = "Thank you for your message! It has been sent successfully.";
                    formMessage.style.display = 'block';
                    formMessage.style.backgroundColor = '#00ffc8';
                    formMessage.style.color = '#0d1117';
                    contactForm.reset();
                } else {
                    formMessage.textContent = "There was an error sending your message. Please try again.";
                    formMessage.style.backgroundColor = '#f8d7da';
                    formMessage.style.color = '#721c24';
                    formMessage.style.display = 'block';
                }
            } catch (error) {
                formMessage.textContent = "Network error. Please check your connection.";
                formMessage.style.backgroundColor = '#f8d7da';
                formMessage.style.color = '#721c24';
                formMessage.style.display = 'block';
            }
        });
    }

    // Image modal functionality
    if (modal && modalImg && modalClose) {
        certCards.forEach(card => {
            card.addEventListener('click', () => {
                modal.style.display = "block";
                modalImg.src = card.dataset.fullImg;
            });
        });

        modalClose.addEventListener('click', () => {
            modal.style.display = "none";
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Toggle active state for experience cards (Glassmorphism & Button)
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent triggering when clicking the link itself if it bubbles up (though link is usually on top)
            if (e.target.closest('.project-demo-btn')) return;

            // Remove active class from all other cards
            experienceCards.forEach(c => {
                if (c !== card) {
                    c.classList.remove('active');
                }
            });

            // Toggle active class on the clicked card
            card.classList.toggle('active');
        });
    });

    // Scroll functionality for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            e.preventDefault();
            const targetId = href.slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const offset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-reveal animations using IntersectionObserver
    const revealItems = document.querySelectorAll(
        '.section-container, .education-card, .experience-card, .skill-card, .cert-card, .thumbnail-content'
    );

    const observerOptions = {
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                entry.target.classList.remove('reveal');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealItems.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Start the typing animation on page load
    changeAboutMeText();
});
