/**
 * Handles smooth scrolling with Lenis and navigation menu interactions.
 * Manages scroll restoration, starts/stops Lenis when opening/closing nav menus,
 * and prevents body scrolling when menus are open.
 */
window.addEventListener("load", function () {
  // Check if Lenis is available
  if (typeof Lenis === 'undefined') {
    console.error('Lenis library is not loaded');
    return;
  }

  try {
    // Disable browser's automatic scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Force scroll to top on load
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Set scroll behavior to auto initially
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";

    let lenisInstance = null;
    let rafId = null;

    /**
     * Starts the Lenis smooth scrolling instance
     */
    function startLenis() {
      if (!lenisInstance) {
        lenisInstance = new Lenis({
          duration: 0.8, // Smooth scroll duration
        });

        function raf(time) {
          lenisInstance.raf(time);
          rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);
      }
    }

    /**
     * Stops and destroys the Lenis instance
     */
    function stopLenis() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
      }
    }

    // Initialize Lenis after a short delay
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      startLenis();
    }, 100);

    // Handle work navigation links - stop scrolling when menu opens
    const navWorkLinks = document.querySelectorAll(".nav-work-link");
    const navWorkWrapper = document.querySelector(".nav-work-wrapper");

    console.log('Found navWorkLinks:', navWorkLinks.length);
    console.log('Found navWorkWrapper:', navWorkWrapper);

    navWorkLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        console.log('Work link clicked');
        e.preventDefault();
        if (navWorkWrapper) {
          navWorkWrapper.style.display = "block"; // Show work menu
          console.log('Work menu shown');
        } else {
          console.log('Work wrapper not found');
        }
        stopLenis();
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      });
    });

    // Handle work menu toggle - resume scrolling when menu closes
    const navWorkToggle = document.querySelector(".nav-work-toggle");
    if (navWorkToggle) {
      navWorkToggle.addEventListener("click", function (e) {
        e.preventDefault();
        if (navWorkWrapper) {
          navWorkWrapper.style.display = "none"; // Hide work menu
        }
        document.body.style.overflow = ""; // Restore scrolling
        startLenis();
      });
    }

    // Handle contact navigation links - stop scrolling when menu opens
    const navContactLinks = document.querySelectorAll(".nav-contact-link");
    const navContactWrapper = document.querySelector(".nav-contact-wrapper");

    console.log('Found navContactLinks:', navContactLinks.length);
    console.log('Found navContactWrapper:', navContactWrapper);

    navContactLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        console.log('Contact link clicked');
        e.preventDefault();
        if (navContactWrapper) {
          navContactWrapper.style.display = "block"; // Show contact menu
          console.log('Contact menu shown');
        } else {
          console.log('Contact wrapper not found');
        }
        stopLenis();
        document.body.style.overflow = "hidden"; // Prevent background scrolling
      });
    });

    // Handle contact menu toggle - resume scrolling when menu closes
    const navContactToggle = document.querySelector(".nav-contact-toggle");
    if (navContactToggle) {
      navContactToggle.addEventListener("click", function (e) {
        e.preventDefault();
        if (navContactWrapper) {
          navContactWrapper.style.display = "none"; // Hide contact menu
        }
        document.body.style.overflow = ""; // Restore scrolling
        startLenis();
      });
    }

  } catch (error) {
    console.error('Error initializing Lenis scrolling:', error);
  }
});