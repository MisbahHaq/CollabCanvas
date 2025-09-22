/**
 * Initializes Swiper instances for brand logo sliders.
 * Creates 5 vertical auto-playing swipers with staggered initialization timing.
 */
window.addEventListener("load", function () {
  // Check if Swiper is available
  if (typeof Swiper === 'undefined') {
    console.error('Swiper library is not loaded');
    return;
  }

  /**
   * Creates a Swiper instance with common configuration
   * @param {string} selector - CSS selector for the swiper container
   * @param {number} delay - Delay in milliseconds before initialization
   */
  function createBrandSwiper(selector, delay) {
    setTimeout(() => {
      try {
        new Swiper(selector, {
          direction: "vertical",        // Vertical sliding
          loop: true,                   // Infinite loop
          allowTouchMove: false,        // Disable touch/swipe
          speed: 1000,                  // Transition speed in ms
          autoplay: {
            delay: 4000,               // Auto-slide every 4 seconds
            disableOnInteraction: false, // Continue autoplay after interaction
          },
        });
      } catch (error) {
        console.error(`Error creating swiper for ${selector}:`, error);
      }
    }, delay);
  }

  // Initialize brand swipers with staggered timing to create visual variety
  createBrandSwiper(".swiper1", 0);    // Immediate
  createBrandSwiper(".swiper2", 100);  // 100ms delay
  createBrandSwiper(".swiper3", 200);  // 200ms delay
  createBrandSwiper(".swiper4", 300);  // 300ms delay
  createBrandSwiper(".swiper5", 300);  // Same delay as swiper4
});