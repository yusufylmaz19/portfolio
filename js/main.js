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

// Enhanced Neon Cursor Effect
function initCursorEffect() {
    // Only on desktop
    if (window.innerWidth < 1024) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    // Create cursor dot (center)
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--neon-green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease, background 0.3s ease;
        box-shadow: 0 0 10px var(--neon-green), 0 0 20px var(--neon-green);
        opacity: 0;
    `;
    document.body.appendChild(cursorDot);

    // Create cursor ring (outer)
    const cursorRing = document.createElement('div');
    cursorRing.className = 'cursor-ring';
    cursorRing.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid var(--neon-green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
        box-shadow: 0 0 20px rgba(0, 255, 136, 0.5), inset 0 0 20px rgba(0, 255, 136, 0.2);
        opacity: 0;
    `;
    document.body.appendChild(cursorRing);

    // Create primary glow layer
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(0, 255, 136, 0.15) 0%, rgba(0, 255, 136, 0.05) 30%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
        animation: pulse 2s ease-in-out infinite;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow);

    // Create secondary glow layer (trailing effect)
    const cursorGlow2 = document.createElement('div');
    cursorGlow2.className = 'cursor-glow-2';
    cursorGlow2.style.cssText = `
        position: fixed;
        width: 250px;
        height: 250px;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, rgba(136, 0, 255, 0.08) 40%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        transform: translate(-50%, -50%);
        transition: all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        animation: pulse 3s ease-in-out infinite alternate;
        opacity: 0;
    `;
    document.body.appendChild(cursorGlow2);

    // Add pulse animation to document
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% {
                opacity: 0.8;
                transform: translate(-50%, -50%) scale(1);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.05);
            }
        }
        
        @keyframes rotate-colors {
            0% {
                filter: hue-rotate(0deg);
            }
            100% {
                filter: hue-rotate(360deg);
            }
        }
    `;
    document.head.appendChild(pulseStyle);

    // Mouse position tracking
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;
    let glow2X = 0, glow2Y = 0;
    let isFirstMove = true;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Show cursor on first mouse movement
        if (isFirstMove) {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
            cursorGlow.style.opacity = '1';
            cursorGlow2.style.opacity = '1';
            isFirstMove = false;
        }
    });

    // Smooth animation for cursor elements
    function animateCursor() {
        // Instant follow for dot
        cursorX = mouseX;
        cursorY = mouseY;

        // Smooth follow for ring (slight delay)
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        // More delayed follow for secondary glow (trail effect)
        glow2X += (mouseX - glow2X) * 0.08;
        glow2Y += (mouseY - glow2Y) * 0.08;

        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';

        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';

        cursorGlow.style.left = cursorX + 'px';
        cursorGlow.style.top = cursorY + 'px';

        cursorGlow2.style.left = glow2X + 'px';
        cursorGlow2.style.top = glow2Y + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Interactive hover effects
    const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .skill-card, .project-card, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.width = '15px';
            cursorDot.style.height = '15px';
            cursorDot.style.background = 'rgba(0, 255, 255, 0.9)';
            cursorDot.style.boxShadow = '0 0 15px cyan, 0 0 30px cyan, 0 0 45px cyan';

            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.borderColor = 'cyan';
            cursorRing.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6), inset 0 0 30px rgba(0, 255, 255, 0.3)';
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.style.width = '8px';
            cursorDot.style.height = '8px';
            cursorDot.style.background = 'var(--neon-green)';
            cursorDot.style.boxShadow = '0 0 10px var(--neon-green), 0 0 20px var(--neon-green)';

            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.borderColor = 'var(--neon-green)';
            cursorRing.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.5), inset 0 0 20px rgba(0, 255, 136, 0.2)';
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
        cursorGlow.style.opacity = '0';
        cursorGlow2.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        cursorGlow.style.opacity = '1';
        cursorGlow2.style.opacity = '1';
    });

    // Click effect
    document.addEventListener('mousedown', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorRing.style.transform = 'translate(-50%, -50%) scale(0.9)';
    });

    document.addEventListener('mouseup', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
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
