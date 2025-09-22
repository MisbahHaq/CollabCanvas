function slider2() {
        document.querySelectorAll(".slider2").forEach((slider) => {
          const splide = new Splide(slider, {
            perPage: 3,
            arrows: false,
            pagination: false,
            gap: "1vw",
            breakpoints: {
              991: {
                perPage: 1,
                pagination: true,
                autoScroll: false,
                gap: "2vw",
              },
              768: { gap: "2vw" },
              478: { gap: "4vw" },
            },
          }).mount(window.splide.Extensions);
          const equalizeHeights = () => {
            const slides = splide.Components.Elements.slides;
            let maxHeight = Math.max(
              ...[...slides].map((slide) => {
                slide.style.height = "";
                return slide.offsetHeight;
              })
            );
            if (maxHeight > 0) {
              slides.forEach(
                (slide) => (slide.style.height = `${maxHeight}px`)
              );
            }
          };
          splide.on("mounted resize", equalizeHeights);
          window.addEventListener("resize", () => splide.refresh());
        });
      }
      slider2();