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


// Event listener for Dark Mode toggle, form submission, and image modal
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
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        darkModeToggle.querySelector('i').classList.toggle('fa-sun', isDarkMode);
        darkModeToggle.querySelector('i').classList.toggle('fa-moon', !isDarkMode);
    });

    // Handle form submission (using Formspree)
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

    // Image modal functionality
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

    // Scroll functionality for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
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

    // Start the typing animation on page load
    changeAboutMeText();
});
