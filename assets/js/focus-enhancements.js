document.addEventListener('DOMContentLoaded', () => {
    console.log("Clarity Focus page script loaded"); // Add console log for confirmation

    // --- ScrollReveal Initialization ---
    const sr = ScrollReveal({
        distance: '50px', // Slightly larger distance
        duration: 1000, // Slightly longer duration
        easing: 'cubic-bezier(0.5, 0, 0, 1)', // Smoother easing
        origin: 'bottom',
        reset: false,
        viewFactor: 0.2 // Trigger slightly earlier
    });

    const comparisonSection = document.getElementById('comparison-section');

    // Reveal Comparison Section
    if (comparisonSection) {
        sr.reveal('#comparison-section', {
            delay: 200,
            afterReveal: () => {
                initMindfulnessJourney();
                initMobileJourney();
            }
        });
    }

    // Reveal Cultivation Section
    sr.reveal('#cultivation-section', { delay: 300 });

    // Reveal individual Cultivation Items with stagger
    sr.reveal('.cultivation-item', { interval: 150, delay: 400, origin: 'top' });

    // Reveal CTA Section
    sr.reveal('#cta-section', { delay: 500 });

    // --- Mobile Journey Functionality ---
    function initMobileJourney() {
        const mobileJourneyContainer = document.getElementById('mobile-journey-container');
        if (!mobileJourneyContainer) return;
        
        console.log("Initializing Mobile Journey");
        
        // Reveal the horizontal line with a slight delay
        sr.reveal('.bg-gradient-to-r', { 
            delay: 300,
            duration: 1200,
            distance: '0px',
            opacity: 0,
            scale: 1,
            origin: 'left'
        });
        
        // Reveal each journey step with stagger
        const mobileSteps = document.querySelectorAll('.mobile-journey-step');
        mobileSteps.forEach(step => {
            const stepNum = parseInt(step.dataset.step);
            sr.reveal(step, {
                delay: 500 + (stepNum * 150),
                distance: '20px',
                origin: 'bottom',
                opacity: 0,
                duration: 800
            });
        });
    }

    // --- Mindfulness Journey Functionality ---
    function initMindfulnessJourney() {
        const journeyPoints = document.querySelectorAll('.journey-point');
        const journeyPath = document.getElementById('journey-path');
        
        if (!journeyPoints.length || !journeyPath) return;
        
        console.log("Initializing Mindfulness Journey with", journeyPoints.length, "points");
        
        // Add click events to journey points
        journeyPoints.forEach(point => {
            point.addEventListener('click', () => {
                // 1. Reset all points to inactive state
                journeyPoints.forEach(p => p.classList.remove('active'));
                
                // 2. Set clicked point to active
                point.classList.add('active');
                
                // 3. Create ripple effect near the point
                createRippleEffect(point);
            });
            
            // Add sequential reveal for journey points
            sr.reveal(`#${point.id}`, { 
                distance: '20px',
                origin: 'center',
                delay: 300 + (parseInt(point.dataset.step) * 150),
                duration: 800,
                opacity: 0,
                scale: 0.8
            });
        });
        
        // Start random ripple effects along the path
        startRandomRipples();
    }

    function createRippleEffect(element) {
        if (!element) return;
        
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        // Position ripple near the element
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        ripple.style.left = `${rect.left + rect.width/2}px`;
        ripple.style.top = `${rect.top + rect.height/2 + scrollTop}px`;
        ripple.style.width = '10px';
        ripple.style.height = '10px';
        
        document.body.appendChild(ripple);
        
        // Remove ripple after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 2000);
    }

    function createRippleAtPathPosition(position) {
        const journeyContainer = document.getElementById('mindfulness-journey-container');
        if (!journeyContainer) return;
        
        const containerRect = journeyContainer.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // This is an approximation - the actual path follows curves
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        
        // Add slight randomization to vertical position
        const verticalOffset = (Math.random() * 20) - 10; // -10px to +10px
        
        // Position ripple along the path based on position parameter (0-1)
        ripple.style.left = `${containerRect.left + (containerRect.width * position)}px`;
        ripple.style.top = `${containerRect.top + (containerRect.height/2) + verticalOffset + scrollTop}px`;
        ripple.style.width = '8px';
        ripple.style.height = '8px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 2000);
    }

    function startRandomRipples() {
        // Start ripples after a short delay to allow for initial animations
        setTimeout(() => {
            // Create first ripple to start the sequence
            createRippleAtPathPosition(Math.random());
            
            // Set up interval for random ripples
            setInterval(() => {
                if (Math.random() > 0.6) { // 40% chance each interval
                    const randomPosition = Math.random();
                    createRippleAtPathPosition(randomPosition);
                }
            }, 3000);
        }, 1500);
    }

    // Legacy code for icon transitions - kept for reference or fallback
    // Commented out since we're using the new journey visualization
    /*
    const iconContainer = document.getElementById('icon-transition-container');
    const icons = iconContainer ? iconContainer.querySelectorAll('.transition-icon') : [];
    const animationDuration = 2500; // Milliseconds (must match CSS animation duration)
    const delayBetweenIcons = 1500; // Milliseconds pause between icons
    let sequenceTimeout;

    function animateIcon(icon, index) {
        // Clear previous timeouts if sequence restarts
        clearTimeout(sequenceTimeout);

        // Add active class to start animation
        icon.classList.add('active');

        // Set timeout to remove active class after animation ends
        sequenceTimeout = setTimeout(() => {
            icon.classList.remove('active');

            // Trigger next icon if available
            const nextIndex = index + 1;
            if (nextIndex < icons.length) {
                sequenceTimeout = setTimeout(() => {
                    animateIcon(icons[nextIndex], nextIndex);
                }, delayBetweenIcons);
            }

        }, animationDuration);
    }

    function startIconSequence() {
        if (icons.length > 0) {
            // Start sequence slightly after reveal finishes
             setTimeout(() => {
                  animateIcon(icons[0], 0);
             }, 500);
        }
    }
    */
}); 