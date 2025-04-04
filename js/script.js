document.addEventListener('DOMContentLoaded', () => {
    // --- Set Current Year in Footer ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        const year = new Date().getFullYear();
        currentYearSpan.textContent = year;
    }

    // --- FAQ Accordion Functionality ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question button');
        if (questionButton) {
            questionButton.addEventListener('click', () => {
                const currentlyActive = item.classList.contains('active');
                // Toggle the clicked item
                item.classList.toggle('active');
                questionButton.setAttribute('aria-expanded', !currentlyActive);

                // --- Optional: Close other FAQ items ---
                // Uncomment the block below if you want only one item open at a time
                /*
                if (!currentlyActive) { // Only close others if we are opening this one
                    faqItems.forEach(otherItem => {
                       if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            otherItem.querySelector('.faq-question button').setAttribute('aria-expanded', 'false');
                        }
                    });
                }
                */
            });
        }
    });

    // --- Intersection Observer for Scroll Fade-In Animations ---
    const fadeElements = document.querySelectorAll('.scroll-fade-in');

    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Animate only once
                }
                // No need for an 'else' block if we unobserve
            });
        };

        const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

        fadeElements.forEach(element => {
            scrollObserver.observe(element);
        });

    } else {
        // Fallback for older browsers (optional: just make elements visible)
        console.log("Intersection Observer not supported, showing all elements.");
        fadeElements.forEach(element => {
            element.classList.add('visible'); // Make them visible directly
        });
    }

    // --- Initial Entrance Animations ---
    // These are handled by CSS delays on '.animated-element'
    // No specific JS needed here unless complex sequencing is required.
});
                      
