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

    // Form validation and submission
    initFormValidation();

    // Fetch GitHub stats for projects
    fetchGitHubStats();

    // Fetch blog posts
    fetchBlogPosts();
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

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Clear previous error messages
        clearErrors();

        // Validate form fields
        const isValid = validateForm();

        if (isValid) {
            await submitForm(form);
        }
    });
}

async function submitForm(form) {
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="button-loading"></span> Sending...';

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Using FormSubmit.co (free service, no backend needed)
        // Replace with your actual email or use EmailJS for more features
        const response = await fetch('https://formsubmit.co/ajax/hegdesriniavsm@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            // Show success message
            successMessage.classList.add('show');
            form.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, there was an error sending your message. Please try again or email me directly.');
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message';
    }
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

// Fetch blog posts from Blogspot RSS feed
async function fetchBlogPosts() {
    const blogGrid = document.querySelector('.blog-grid');
    const blogLoading = document.getElementById('blog-loading');
    
    try {
        // Blogspot RSS feed URL
        const blogUrl = 'https://thoughts-srinivas.blogspot.com/feeds/posts/default?alt=json&max-results=3';
        
        const response = await fetch(blogUrl);
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        
        const data = await response.json();
        const posts = data.feed.entry || [];
        
        if (blogLoading) blogLoading.remove();
        
        posts.forEach((post, index) => {
            const title = post.title.$t;
            const link = post.link.find(l => l.rel === 'alternate').href;
            const published = new Date(post.published.$t).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Extract excerpt (remove HTML tags)
            let content = post.content?.$t || post.summary?.$t || '';
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            const excerpt = tempDiv.textContent.substring(0, 150) + '...';
            
            // Get thumbnail if available
            const thumbnail = post.media$thumbnail?.url || '';
            
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            blogCard.setAttribute('data-aos', 'fade-up');
            blogCard.setAttribute('data-aos-delay', (index + 1) * 100);
            
            blogCard.innerHTML = `
                ${thumbnail ? `<img src="${thumbnail}" alt="${title}" class="blog-image">` : ''}
                <div class="blog-content">
                    <div class="blog-date">
                        <i class="fa-regular fa-calendar"></i>
                        <span>${published}</span>
                    </div>
                    <h3><a href="${link}" target="_blank">${title}</a></h3>
                    <p class="blog-excerpt">${excerpt}</p>
                    <a href="${link}" target="_blank" class="blog-read-more">
                        Read More <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            `;
            
            blogGrid.appendChild(blogCard);
        });
        
        // Re-initialize AOS for new elements
        AOS.refresh();
        
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        if (blogLoading) {
            blogLoading.innerHTML = '<div class="stat-item"><span style="color: var(--text-tertiary);">Unable to load blog posts. <a href="https://thoughts-srinivas.blogspot.com/" target="_blank" style="color: var(--accent-primary);">Visit blog directly</a></span></div>';
        }
    }
}

function showSuccessMessage() {
    alert('Thank you for your message! I will get back to you soon.');
}
