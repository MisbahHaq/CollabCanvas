/**
 * Initializes and configures Splide sliders for expertise sections.
 * Sets up responsive behavior and equalizes slide heights for consistent layout.
 */
function slider2() {
  // Check if Splide is available
  if (typeof Splide === 'undefined') {
    console.error('Splide library is not loaded');
    return;
  }

  document.querySelectorAll(".slider2").forEach((slider) => {
    try {
      const splide = new Splide(slider, {
        perPage: 3,           // Show 3 slides per page on desktop
        arrows: false,        // Hide navigation arrows
        pagination: false,    // Hide pagination dots
        gap: "1vw",           // Gap between slides
        breakpoints: {
          991: {
            perPage: 1,      // Show 1 slide on tablets
            pagination: true, // Show pagination on smaller screens
            autoScroll: false,
            gap: "2vw",
          },
          768: { gap: "2vw" },
          478: { gap: "4vw" },
        },
      }).mount(window.splide.Extensions);

      /**
       * Equalizes the height of all slides to the tallest one for consistent layout
       */
      const equalizeHeights = () => {
        const slides = splide.Components.Elements.slides;
        if (!slides || slides.length === 0) return;

        // Reset heights and find the maximum height
        let maxHeight = Math.max(
          ...[...slides].map((slide) => {
            slide.style.height = ""; // Reset height to auto
            return slide.offsetHeight;
          })
        );

        // Apply the maximum height to all slides
        if (maxHeight > 0) {
          slides.forEach((slide) => {
            slide.style.height = `${maxHeight}px`;
          });
        }
      };

      // Equalize heights when slider is mounted or window is resized
      splide.on("mounted resize", equalizeHeights);

      // Refresh slider on window resize to handle dynamic content
      window.addEventListener("resize", () => splide.refresh());

    } catch (error) {
      console.error('Error initializing slider2:', error);
    }
  });
}

// Initialize sliders when DOM is ready
document.addEventListener('DOMContentLoaded', slider2);