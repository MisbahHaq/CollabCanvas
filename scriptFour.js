/**
 * Initializes and configures Splide sliders for awards sections.
 * Sets up responsive behavior with touch/drag support and pagination on mobile.
 */
function slider3() {
  // Check if Splide is available
  if (typeof Splide === 'undefined') {
    console.error('Splide library is not loaded');
    return;
  }

  document.querySelectorAll(".slider3").forEach((slider) => {
    try {
      const splide = new Splide(slider, {
        type: "slide",           // Standard slide type
        arrows: false,           // Hide navigation arrows
        autoWidth: false,        // Fixed width slides
        rewind: false,           // Don't rewind to start after last slide
        drag: true,              // Enable drag/swipe
        trimSpace: true,         // Remove extra space
        autoplay: false,         // Disable autoplay
        dragAngleThreshold: 30,  // Angle threshold for drag detection
        flickPower: 150,         // Power for flick gestures
        destroy: true,           // Allow destruction on breakpoints
        breakpoints: {
          478: {
            destroy: false,     // Don't destroy on mobile
            perPage: 1,        // Show 1 slide per page on mobile
            gap: "4vw",        // Gap between slides
            pagination: true,  // Show pagination dots
            flickMaxPages: 1,  // Max pages for flick
          },
        },
      });

      splide.mount();

    } catch (error) {
      console.error('Error initializing slider3:', error);
    }
  });
}

// Initialize sliders when DOM is ready
document.addEventListener('DOMContentLoaded', slider3);