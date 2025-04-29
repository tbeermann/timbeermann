document.addEventListener('DOMContentLoaded', () => {

    // --- ScrollReveal Initialization ---
    const sr = ScrollReveal({
        distance: '50px', // Slightly larger distance
        duration: 1000, // Slightly longer duration
        easing: 'cubic-bezier(0.5, 0, 0, 1)', // Smoother easing
        origin: 'bottom',
        reset: false,
        viewFactor: 0.2 // Trigger slightly earlier
    });

    // Reveal Comparison Section
    sr.reveal('#comparison-section', { delay: 200 });

    // Reveal Cultivation Section
    sr.reveal('#cultivation-section', { delay: 300 });

    // Reveal individual Cultivation Items with stagger
    sr.reveal('.cultivation-item', { interval: 150, delay: 400, origin: 'top' });

    // Reveal CTA Section
    sr.reveal('#cta-section', { delay: 500 });

}); 