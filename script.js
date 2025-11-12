// Initialize AOS (Animate on Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 600,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });

    // Navigation scrollspy
    initScrollSpy();

    // Set copyright year
    setCopyrightYear();

    // Form validation
    initFormValidation();
});

// Scrollspy functionality
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href && href.substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '-80px 0px -80px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Set copyright year
function setCopyrightYear() {
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Form validation
function initFormValidation() {
    const form = document.querySelector('#main-contact-form');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous error messages
        clearErrors();

        // Validate form fields
        const isValid = validateForm();

        if (isValid) {
            // Show success message
            showSuccessMessage();
            // Reset form
            form.reset();
        }
    });
}

function validateForm() {
    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    }

    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    input.parentElement.appendChild(error);
    input.style.borderColor = 'var(--accent-primary)';
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());

    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showSuccessMessage() {
    alert('Thank you for your message! I will get back to you soon.');
}
