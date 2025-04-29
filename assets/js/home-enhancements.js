document.addEventListener('DOMContentLoaded', () => {

    // --- ScrollReveal Initialization ---
    const sr = ScrollReveal({
        distance: '30px',
        duration: 800,
        easing: 'ease-in-out',
        origin: 'bottom',
        reset: false, // Animation only happens once
        viewFactor: 0.3 // Trigger when 30% of element is visible
    });

    // Reveal the main text block (headline + paragraph container)
    const mainTextBlock = document.getElementById('main-text-block');
    if (mainTextBlock) {
        sr.reveal('#main-text-block', { delay: 200 });
    }

    // Reveal the explore section
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
        sr.reveal('#explore', { delay: 400 });
    }

    // --- Fading Tagline Initialization ---
    const taglineElement = document.getElementById('fading-tagline');
    const taglines = [
        'Embrace Effortless Living.',
        'Focus On What Matters.',
        'Let AI Simplify Your World.',
        'Find Clarity and Calm.'
        // Add more taglines if desired
    ];

    if (taglineElement && taglines.length > 0) {
        let currentIndex = 0;
        const fadeDuration = 800; // Matches CSS transition duration
        const displayDuration = 3500; // How long to show each tagline

        const showNextTagline = () => {
            // Fade out current text
            taglineElement.classList.remove('visible');

            // Wait for fade out, then change text and fade in
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % taglines.length;
                taglineElement.textContent = taglines[currentIndex];
                taglineElement.classList.add('visible');
            }, fadeDuration);
        };

        // Initial setup: show the first tagline after a short delay
        setTimeout(() => {
            taglineElement.textContent = taglines[currentIndex];
            taglineElement.classList.add('visible');

            // Start the cycle
            setInterval(showNextTagline, displayDuration + fadeDuration);
        }, 1000); // Initial delay before starting the fade effect
    }

}); 