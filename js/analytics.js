/**
 * Google Analytics Integration
 * Uses the ID defined in env.js
 */
(function () {
    const gaId = "G-E1HC47YG6F"
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', gaId);
}
)();

// Custom Event Tracking Helper
window.trackEvent = function (action, category, label, value) {
    if (typeof gtag === 'function') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label,
            'value': value
        });
    } else {
        console.log('Google Analytics not initialized', { action, category, label, value });
    }
};

// Auto-track key interactions
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');

        if (!target) return;

        let category = 'Unknown';
        let action = 'click';
        let label = target.innerText || target.href || target.id;

        // Determine category based on class or element
        if (target.classList.contains('btn')) {
            category = 'Button';
        } else if (target.classList.contains('nav-link')) {
            category = 'Navigation';
        } else if (target.classList.contains('social-link')) {
            category = 'Social';
            // Specific logic for social links if needed, e.g., get the aria-label
            label = target.getAttribute('aria-label') || label;
        } else if (target.tagName === 'A') {
            category = 'Link';
        } else if (target.tagName === 'BUTTON') {
            category = 'Button';
        }

        // Send event
        if (category !== 'Unknown') {
            window.trackEvent(action, category, label);
        }
    });

    // Track Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            window.trackEvent('form_submit', 'Contact', 'Contact Form Submitted');
        });
    }
});
