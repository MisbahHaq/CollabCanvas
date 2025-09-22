/**
 * Handles text animation for home-intro elements.
 * Wraps the first word in a special span, splits text into words using SplitType,
 * and animates color change on scroll using GSAP ScrollTrigger.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Check if required libraries are available
  if (typeof SplitType === 'undefined' || typeof gsap === 'undefined') {
    console.error('SplitType or GSAP library is not loaded');
    return;
  }

  document.querySelectorAll(".home-intro").forEach((element) => {
    if (!element) return;

    try {
      // Get the text content and split it into words
      let words = element.textContent.trim().split(" ");

      // Wrap the first word in a special span for styling
      if (words.length > 0) {
        words[0] = `<span class="studio-text-indent">${words[0]}</span>`;
      }

      // Reconstruct the HTML with the wrapped first word
      element.innerHTML = words.join(" ");

      // Split the text into words using SplitType for animation
      new SplitType(element, {
        types: "words", // Split by words
        tagName: "span",
      });

      /**
       * Gets responsive ScrollTrigger values based on screen size
       * @returns {Object} Object with start and end trigger positions
       */
      function getScrollTriggerValues() {
        if (window.matchMedia("(max-width: 480px)").matches) {
          return { start: "top 130%", end: "top 70%" };
        } else if (window.matchMedia("(max-width: 768px)").matches) {
          return { start: "top 130%", end: "top 70%" };
        } else if (window.matchMedia("(max-width: 992px)").matches) {
          return { start: "top 100%", end: "top 50%" };
        } else {
          return { start: "top 100%", end: "top 50%" };
        }
      }

      const scrollValues = getScrollTriggerValues();

      // Create GSAP timeline with ScrollTrigger
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: element,
            start: scrollValues.start,
            end: scrollValues.end,
            scrub: 2, // Smooth scrubbing
          },
        })
        .set(element, { visibility: "visible" }) // Make element visible
        .fromTo(
          element.querySelectorAll(".word"), // Target split words
          { color: "#E5E5E5" }, // From light gray
          {
            color: "#1D1D1D", // To dark color
            duration: 6,
            stagger: 0.4, // Stagger animation
            ease: "power3.inOut",
          }
        );

      /**
       * Handles window resize by updating ScrollTrigger values
       */
      function handleResize() {
        const newValues = getScrollTriggerValues();
        if (tl.scrollTrigger) {
          tl.scrollTrigger.update({
            start: newValues.start,
            end: newValues.end,
          });
        }
      }

      // Listen for media query changes and window resize
      const mqSmall = window.matchMedia("(max-width: 479px)");
      const mqMedium = window.matchMedia("(max-width: 767px)");
      const mqLarge = window.matchMedia("(max-width: 991px)");

      mqSmall.addListener(handleResize);
      mqMedium.addListener(handleResize);
      mqLarge.addListener(handleResize);
      window.addEventListener("resize", handleResize);

    } catch (error) {
      console.error('Error initializing text animation:', error);
    }
  });
});