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
