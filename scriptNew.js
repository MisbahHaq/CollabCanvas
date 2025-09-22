window.addEventListener("load", function () {
        if ("scrollRestoration" in history) {
          history.scrollRestoration = "manual";
        }

        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

        document.documentElement.style.scrollBehavior = "auto";
        document.body.style.scrollBehavior = "auto";

        let lenisInstance = null;
        let rafId = null;

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

        setTimeout(() => {
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;

          startLenis();
        }, 100);

        const navWorkLinks = document.querySelectorAll(".nav-work-link");
        navWorkLinks.forEach((link) => {
          link.addEventListener("click", function (e) {
            e.preventDefault();
            stopLenis();
            document.body.style.overflow = "hidden";
          });
        });

        const navWorkToggle = document.querySelector(".nav-work-toggle");
        if (navWorkToggle) {
          navWorkToggle.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.style.overflow = "";
            startLenis();
          });
        }

        const navContactLinks = document.querySelectorAll(".nav-contact-link");
        navContactLinks.forEach((link) => {
          link.addEventListener("click", function (e) {
            e.preventDefault();
            stopLenis();
            document.body.style.overflow = "hidden";
          });
        });

        const navContactToggle = document.querySelector(".nav-contact-toggle");
        if (navContactToggle) {
          navContactToggle.addEventListener("click", function (e) {
            e.preventDefault();
            document.body.style.overflow = "";
            startLenis();
          });
        }
      });