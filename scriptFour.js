function slider3() {
        document.querySelectorAll(".slider3").forEach((slider) => {
          const splide = new Splide(slider, {
            type: "slide",
            arrows: false,
            autoWidth: false,
            rewind: false,
            drag: true,
            trimSpace: true,
            autoplay: false,
            dragAngleThreshold: 30,
            flickPower: 150,
            destroy: true,
            breakpoints: {
              478: {
                destroy: false,
                perPage: 1,
                gap: "4vw",
                pagination: true,
                flickMaxPages: 1,
              },
            },
          });
          splide.mount();
        });
      }
      slider3();