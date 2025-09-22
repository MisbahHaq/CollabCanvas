/**
 * Handles "tricks" text animations for desktop screens.
 * Wraps words and letters in spans, then creates fade-up/fade-down animations
 * on hover for elements within home video containers.
 */
document.addEventListener('DOMContentLoaded', function() {
  // Only apply animations on desktop screens (width >= 992px)
  if (window.innerWidth >= 992) {
    // Check if anime.js is available
    if (typeof anime === 'undefined') {
      console.error('Anime.js library is not loaded');
      return;
    }

    try {
      // Wrap each word in .tricks elements with .tricksword spans
      const tricksWord = document.getElementsByClassName("tricks");
      for (let i = 0; i < tricksWord.length; i++) {
        const wordWrap = tricksWord.item(i);
        wordWrap.innerHTML = wordWrap.innerHTML.replace(
          /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
          '$1<span class="tricksword">$2</span>'
        );
      }

      // Wrap each letter in .tricksword elements with .letter spans
      const tricksLetter = document.getElementsByClassName("tricksword");
      for (let i = 0; i < tricksLetter.length; i++) {
        const letterWrap = tricksLetter.item(i);
        letterWrap.innerHTML = letterWrap.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
      }

      /**
       * Creates a fade-up animation timeline for the target element
       * @param {HTMLElement} target - The element to animate
       * @returns {Object} Anime.js timeline instance
       */
      function createFadeUpAnimation(target) {
        return anime.timeline({
          loop: false,
          autoplay: false,
        }).add({
          targets: target.querySelectorAll(".tricksword"),
          translateY: [100, 0], // Slide up from below
          opacity: [0, 1],      // Fade in
          translateZ: 0,
          easing: "easeInOutQuad",
          duration: 600,
          delay: (el, i) => 100 + 30 * i, // Staggered delay
        });
      }

      /**
       * Creates a fade-down animation timeline for the target element
       * @param {HTMLElement} target - The element to animate
       * @returns {Object} Anime.js timeline instance
       */
      function createFadeDownAnimation(target) {
        return anime.timeline({
          loop: false,
          autoplay: false,
        }).add({
          targets: target.querySelectorAll(".tricksword"),
          translateY: [0, -100], // Slide up and out
          opacity: [1, 0],       // Fade out
          translateZ: 0,
          easing: "easeInOutQuad",
          duration: 600,
          delay: (el, i) => 50 * i, // Staggered delay
        });
      }

      // Apply animations to all home video containers
      const homeVideoContainers = document.querySelectorAll(".home-video-container");
      homeVideoContainers.forEach(function (container) {
        const fadeUpElements = container.querySelectorAll(".fade-up");
        const animations = [];

        // Create animation instances for each fade-up element
        fadeUpElements.forEach(function (element) {
          animations.push({
            element: element,
            fadeUp: createFadeUpAnimation(element),
            fadeDown: createFadeDownAnimation(element),
          });
        });

        // Play fade-up animation on mouse enter
        container.addEventListener("mouseenter", function () {
          animations.forEach(({ fadeUp }) => {
            fadeUp.restart();
          });
        });

        // Play fade-down animation on mouse leave
        container.addEventListener("mouseleave", function () {
          animations.forEach(({ fadeDown }) => {
            fadeDown.restart();
          });
        });
      });

    } catch (error) {
      console.error('Error initializing tricks animations:', error);
    }
  }
});