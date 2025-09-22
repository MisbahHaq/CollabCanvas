 function slider1() {
        document.querySelectorAll(".slider1").forEach((slider) => {
          const splide = new Splide(slider, {
            type: "slide",
            perPage: 3,
            gap: "1vw",
            arrows: false,
            pagination: false,
            autoWidth: false,
            rewind: false,
            drag: true,
            trimSpace: true,
            autoplay: false,
            interval: 0,
            speed: 600,
            pauseOnHover: false,
            pauseOnFocus: false,
            dragAngleThreshold: 30,
            flickPower: 150,
            flickMaxPages: 3,
            breakpoints: {
              991: {
                perPage: 1,
                pagination: true,
                gap: "2vw",
                flickMaxPages: 1,
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
          delete splide.options.autoplay;
          splide.mount();
        });
      }
      slider1();