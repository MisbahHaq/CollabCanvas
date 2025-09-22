// Lenis smooth scrolling and navigation controls

window.addEventListener('load', function () {
  // Scroll restoration
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // Reset scroll position
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Set scroll behavior
  document.documentElement.style.scrollBehavior = 'auto';
  document.body.style.scrollBehavior = 'auto';

  let lenisInstance = null;
  let rafId = null;

  // Start Lenis
  function startLenis() {
    if (!lenisInstance) {
      lenisInstance = new Lenis({
        duration: 0.8,
      });

      function raf(time) {
        lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    }
  }

  // Stop Lenis
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

  // Initialize after delay
  setTimeout(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    startLenis();
  }, 100);

  // Navigation work links
  const navWorkLinks = document.querySelectorAll('.nav-work-link');
  navWorkLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      stopLenis();
      document.body.style.overflow = 'hidden';
    });
  });

  // Navigation work toggle
  const navWorkToggle = document.querySelector('.nav-work-toggle');
  if (navWorkToggle) {
    navWorkToggle.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.style.overflow = '';
      startLenis();
    });
  }

  // Navigation contact links
  const navContactLinks = document.querySelectorAll('.nav-contact-link');
  navContactLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      stopLenis();
      document.body.style.overflow = 'hidden';
    });
  });

  // Navigation contact toggle
  const navContactToggle = document.querySelector('.nav-contact-toggle');
  if (navContactToggle) {
    navContactToggle.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.style.overflow = '';
      startLenis();
    });
  }
});

// Nav work list Lenis
const container = document.querySelector('.nav-work-list-wrapper');
const lenis = new Lenis({
  wrapper: container,
  content: container.querySelector('.nav-work-list'),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);