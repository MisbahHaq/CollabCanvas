/**
* Initializes and configures Splide sliders for home sections.
* Sets up responsive behavior with touch/drag support and removes autoplay.
*/
/**
 * Initializes and configures Splide sliders for home sections.
 * Dynamically generates video slides from data attribute.
 */
function slider1() {
  // Check if Splide is available
  if (typeof Splide === 'undefined') {
    console.error('Splide library is not loaded');
    return;
  }

  document.querySelectorAll(".slider1").forEach((slider) => {
    try {
      const slideList = slider.querySelector('.splide__list');
      const videoIds = JSON.parse(slideList.getAttribute('data-videos') || '[]');

      // Generate slides dynamically
      videoIds.forEach(videoId => {
        const slide = document.createElement('div');
        slide.className = 'splide__slide home';

        slide.innerHTML = `
          <div class="video-slider-container">
            <div class="myvideoclass height-100-tablet w-embed w-iframe">
              <div data-video-id="32409" style="width: 100%; height: 100%; overflow: hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://app.vidzflow.com/v/${videoId}?dq=source&ap=true&muted=true&loop=true&ctp=false&bv=false&piv=false&playsinline=true&bc=%234E5FFD&controls=false"
                  style="overflow: hidden"
                  frameborder="0"
                  scrolling="no"
                  allow="fullscreen">
                </iframe>
              </div>
            </div>
          </div>
          <div class="overlay-hover"></div>
        `;

        slideList.appendChild(slide);
      });

      const splide = new Splide(slider, {
        type: "slide",              // Standard slide type
        perPage: 3,                 // Show 3 slides per page on desktop
        gap: "1vw",                 // Gap between slides
        arrows: false,              // Hide navigation arrows
        pagination: false,          // Hide pagination dots
        autoWidth: false,           // Fixed width slides
        rewind: false,              // Don't rewind to start
        drag: true,                 // Enable drag/swipe
        trimSpace: true,            // Remove extra space
        autoplay: false,            // Disable autoplay
        interval: 0,                // No autoplay interval
        speed: 600,                 // Transition speed
        pauseOnHover: false,        // Don't pause on hover
        pauseOnFocus: false,        // Don't pause on focus
        dragAngleThreshold: 30,     // Angle threshold for drag
        flickPower: 150,            // Power for flick gestures
        flickMaxPages: 3,           // Max pages for flick on desktop
        breakpoints: {
          991: {
            perPage: 1,            // Show 1 slide on tablets
            pagination: true,      // Show pagination
            gap: "2vw",
            flickMaxPages: 1,      // Max 1 page for flick
          },
          768: {
            gap: "3vw",
            flickMaxPages: 1,
          },
          478: {
            gap: "4vw",
            flickMaxPages: 1,
          },
        },
      });

      // Explicitly remove autoplay option
      delete splide.options.autoplay;

      splide.mount();

    } catch (error) {
      console.error('Error initializing slider1:', error);
    }
  });
}

// Initialize sliders when DOM is ready
document.addEventListener('DOMContentLoaded', slider1);