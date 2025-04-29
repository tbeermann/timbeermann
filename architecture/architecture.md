# Project Architecture: Infinitely Simple Life

**Version:** 0.1
**Date:** 2025-04-29

## 1. Overview

This document outlines the technical architecture for the "Infinitely Simple Life" website.
The primary goal is to create a calming, engaging static website exploring themes of simplicity, focus, and AI assistance in modern life.

## 2. Technology Stack

*   **Frontend:** HTML5, CSS3 (Tailwind CSS via CDN), JavaScript
*   **CSS Framework:** Tailwind CSS (v3 via CDN)
*   **JavaScript Libraries (Current):**
    *   ScrollReveal.js (CDN) - For scroll-based animations (`home.html`)
*   **Hosting:** Static hosting (e.g., GitHub Pages, Netlify, Vercel)

## 3. Directory Structure

```
/
|-- index.html             # Main landing page
|-- home.html              # Enhanced experimental landing page variant
|-- pages/
|   |-- automation.html
|   |-- clarity-focus.html
|   |-- living-lighter.html
|-- assets/
|   |-- css/
|   |   |-- styles.css       # Base custom styles
|   |   |-- animations.css   # Gradient animation styles
|   |-- js/
|   |   |-- home-enhancements.js # JS for home.html (scroll reveal, fading text)
|   |   |-- focus-enhancements.js # JS for clarity-focus.html (scroll reveal)
|   |-- images/
|       |-- (Site images, logos, generated assets)
|-- docs/
|   |-- infinetly-simple-life-project.md # Project summary/brief
|-- architecture/
|   |-- architecture.md    # This file
|   |-- worklog.md         # Log of development activities
|-- .gitignore
|-- README.md
|-- CNAME                  # (If using custom domain)
|-- favicon.ico
```

## 4. Key Components & Features

*   **Homepage (`index.html`):** Simple entry point with animated gradient background and basic card styles.
*   **Homepage Enhanced (`home.html`):** Variant using animated gradient, ScrollReveal animations, refined card hover effects, and a fading tagline effect.
*   **Content Pages (`pages/`):** Dedicated pages for exploring sub-themes (Automation, Focus, Living Lighter).
    *   `clarity-focus.html`: Enhanced with subtle arrow animation, hover effects on cultivation items, and scroll-reveal animations.
*   **Styling:** Primarily Tailwind utility classes, minimal custom CSS.
*   **Interactivity:** Subtle animations (hover effects, scroll reveals, fading text effect) to enhance engagement without overwhelming.

## 5. Design Principles

*   Minimalist Aesthetic
*   Emphasis on Tranquility and Ease
*   High Readability (Clean Typography)
*   Intuitive Navigation
*   Responsive Design

## 6. Future Considerations

*   Integration of AI-generated imagery.
*   Potential for more complex interactive elements (if needed).
*   Refinement of color palettes and typography.
*   Content Management System (CMS) integration if content becomes dynamic or frequently updated (though aiming for static initially).

## 7. Mindfulness Journey Visualization

Located in the Clarity & Focus page, this component visualizes the path from distraction to presence:

1. **SVG Path**: A gradient-colored flowing path from "murky mind" to "still pond"
2. **Interactive Touch Points**: Five stages of the mindfulness journey:
   - Awareness: Recognizing thought patterns
   - Breath: Using breath as an anchor
   - Letting Go: Releasing distractions
   - Presence: Being in the moment
   - Clarity: Achieving mental stillness

3. **Visual Effects**:
   - Flowing animation on the path
   - Ripple effects that appear along the journey
   - Hover interactions with descriptive tooltips
   
4. **Mobile Adaptation**:
   - Simplified vertical timeline for smaller screens
   - Three key journey points with descriptive text

*   Content Management System (CMS) integration if content becomes dynamic or frequently updated (though aiming for static initially). 