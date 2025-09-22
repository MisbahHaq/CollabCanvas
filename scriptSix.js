 document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".home-intro").forEach((element) => {
          if (element) {
            // Get the text content and split it manually
            let words = element.textContent.trim().split(" ");
            // Ensure there are words
            if (words.length > 0) {
              // Wrap the first word in a separate span
              words[0] = `<span class="studio-text-indent">${words[0]}</span>`;
            }
            // Reconstruct the HTML with the wrapped first word
            element.innerHTML = words.join(" ");
            // Apply SplitType to the element AFTER manually wrapping the first word
            new SplitType(element, {
              types: "words", // Split by words
              tagName: "span",
            });
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
            const tl = gsap
              .timeline({
                scrollTrigger: {
                  trigger: element,
                  start: scrollValues.start,
                  end: scrollValues.end,
                  scrub: 2,
                },
              })
              .set(element, { visibility: "visible" })
              .fromTo(
                element.querySelectorAll(".word"),
                { color: "#E5E5E5" },
                {
                  color: "#1D1D1D",
                  duration: 6,
                  stagger: 0.4,
                  ease: "power3.inOut",
                }
              );
            function handleResize() {
              const newValues = getScrollTriggerValues();
              tl.scrollTrigger.update({
                start: newValues.start,
                end: newValues.end,
              });
            }
            const mqSmall = window.matchMedia("(max-width: 479px)");
            const mqMedium = window.matchMedia("(max-width: 767px)");
            const mqLarge = window.matchMedia("(max-width: 991px)");
            mqSmall.addListener(handleResize);
            mqMedium.addListener(handleResize);
            mqLarge.addListener(handleResize);
            window.addEventListener("resize", handleResize);
          }
        });
      });