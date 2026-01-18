document.addEventListener('DOMContentLoaded', () => {
    // Check localStorage for saved language, default to 'en'
    let currentLang = localStorage.getItem('language') || 'en';

    // Initial content update
    updateLanguage(currentLang);
    updateLanguageButton(currentLang);

    // Create and append Language Switcher to Nav if it doesn't exist
    const navContainer = document.querySelector('.nav-links');
    if (navContainer && !document.getElementById('lang-toggle')) {
        const langLi = document.createElement('li');
        const langBtn = document.createElement('button');
        langBtn.id = 'lang-toggle';
        langBtn.className = 'nav-link btn-text';
        langBtn.style.background = 'transparent';
        langBtn.style.border = '1px solid var(--color-text-primary)';
        langBtn.style.padding = '0.2rem 0.5rem';
        langBtn.style.cursor = 'pointer';
        langBtn.style.marginLeft = '1rem';
        langBtn.style.fontSize = '0.8rem';
        langBtn.style.borderRadius = '4px';

        langBtn.innerText = currentLang === 'tr' ? 'EN' : 'TR';

        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'tr' ? 'en' : 'tr';
            localStorage.setItem('language', currentLang);
            updateLanguage(currentLang);
            updateLanguageButton(currentLang);

            // Dispatch custom event for dynamic content
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLang } }));

            // Track language switch event
            if (window.trackEvent) {
                window.trackEvent('switch_language', 'Interface', currentLang);
            }
        });

        langLi.appendChild(langBtn);
        // Insert before the first item or at the end - let's put it at the end
        navContainer.appendChild(langLi);
    }
});

function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(key, lang);

        if (translation) {
            // Check if it's an input or textarea with placeholder
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                }
            } else {
                // Determine if we should use innerHTML (for tags inside) or innerText
                // The translation file contains some HTML tags like <strong> and <br>
                element.innerHTML = translation;
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

function updateLanguageButton(lang) {
    const btn = document.getElementById('lang-toggle');
    if (btn) {
        btn.innerText = lang === 'tr' ? 'EN' : 'TR';
        btn.setAttribute('aria-label', lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç');
    }
}

function getTranslation(key, lang) {
    const keys = key.split('.');
    let result = translations[lang];

    for (const k of keys) {
        if (result && result[k]) {
            result = result[k];
        } else {
            return null;
        }
    }

    return result;
}

// Expose helpers globally so blog.js can use them
window.getTranslation = getTranslation;
window.getCurrentLanguage = () => localStorage.getItem('language') || 'en';
