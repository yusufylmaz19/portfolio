// ========================================
// MAIN.JS - Navigation, Animations & Utils
// ========================================

// Mobile Navigation Toggle
function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Scroll Animations with IntersectionObserver
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .stagger-children');

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Smooth scroll for anchor links
function initSmoothScroll() {
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
}

// Contact Form Validation and EmailJS Integration
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Import email config
    import('./email-config.js')
        .then(module => {
            const EMAIL_CONFIG = module.default;

            // Initialize EmailJS
            emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                let isValid = true;
                const formGroups = form.querySelectorAll('.form-group');

                // Reset errors
                formGroups.forEach(group => group.classList.remove('error'));

                // Validate name
                const nameInput = form.querySelector('#name');
                if (nameInput && nameInput.value.trim().length < 2) {
                    nameInput.closest('.form-group').classList.add('error');
                    isValid = false;
                }

                // Validate email
                const emailInput = form.querySelector('#email');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailInput && !emailRegex.test(emailInput.value.trim())) {
                    emailInput.closest('.form-group').classList.add('error');
                    isValid = false;
                }

                // Validate subject
                const subjectInput = form.querySelector('#subject');
                if (subjectInput && subjectInput.value.trim().length < 2) {
                    subjectInput.closest('.form-group').classList.add('error');
                    isValid = false;
                }

                // Validate message
                const messageInput = form.querySelector('#message');
                if (messageInput && messageInput.value.trim().length < 10) {
                    messageInput.closest('.form-group').classList.add('error');
                    isValid = false;
                }

                if (!isValid) {
                    showNotification('Lütfen tüm alanları doğru doldurun.', 'error');
                    return;
                }

                // Get submit button and add loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Gönderiliyor...</span>';

                try {
                    // Send email via EmailJS
                    const templateParams = {
                        from_name: nameInput.value.trim(),
                        from_email: emailInput.value.trim(),
                        subject: subjectInput.value.trim(),
                        message: messageInput.value.trim()
                    };

                    const response = await emailjs.send(
                        EMAIL_CONFIG.SERVICE_ID,
                        EMAIL_CONFIG.TEMPLATE_ID,
                        templateParams
                    );

                    console.log('Email sent successfully:', response);

                    // Show success message
                    showNotification('Mesajınız başarıyla gönderildi! 🎉', 'success');
                    form.reset();

                } catch (error) {
                    console.error('Email send failed:', error);

                    // Check if it's a config error
                    if (error.text && error.text.includes('not found')) {
                        showNotification('⚠️ Email servisi yapılandırılmamış. Lütfen email-config.js dosyasını kontrol edin.', 'error');
                    } else {
                        showNotification('Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.', 'error');
                    }
                } finally {
                    // Restore button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        })
        .catch(error => {
            console.error('Email config import failed:', error);
            console.warn('EmailJS not configured. Form will log to console only.');

            // Fallback: simple console logging if config not available
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                console.log('Form data (EmailJS not configured):', Object.fromEntries(formData));
                showNotification('⚠️ Email servisi aktif değil. Konsolu kontrol edin.', 'error');
            });
        });
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem 2rem;
    background: ${type === 'success' ? 'var(--neon-green)' : '#ff4444'};
    color: #000;
    border-radius: var(--radius-md);
    font-weight: 600;
    z-index: 10000;
    animation: slideIn 0.3s ease;
    box-shadow: ${type === 'success' ? 'var(--glow-green)' : '0 0 20px #ff4444'};
  `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;
document.head.appendChild(style);

// Navbar background on scroll
function initNavbarScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });
}

// Cursor glow effect (subtle)
function initCursorEffect() {
    // Only on desktop
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(0, 255, 136, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// Typing effect for hero (optional)
function initTypingEffect() {
    const element = document.querySelector('.typing-effect');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    type();
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    setActiveNavLink();
    initScrollAnimations();
    initSmoothScroll();
    initNavbarScroll();
    initCursorEffect();
    initTypingEffect();
});

// Expose functions globally if needed
window.showNotification = showNotification;
