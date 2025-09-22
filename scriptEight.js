window.addEventListener("load", function () {
        setTimeout(() => {
          var swiper1 = new Swiper(".swiper1", {
            direction: "vertical",
            loop: true,
            allowTouchMove: false,
            speed: 1000,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
          });
        }, 0);
        setTimeout(() => {
          var swiper2 = new Swiper(".swiper2", {
            direction: "vertical",
            loop: true,
            allowTouchMove: false,
            speed: 1000,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
          });
        }, 100);
        setTimeout(() => {
          var swiper3 = new Swiper(".swiper3", {
            direction: "vertical",
            loop: true,
            allowTouchMove: false,
            speed: 1000,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
          });
        }, 200);
        setTimeout(() => {
          var swiper4 = new Swiper(".swiper4", {
            direction: "vertical",
            loop: true,
            allowTouchMove: false,
            speed: 1000,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
          });
        }, 300);
        setTimeout(() => {
          var swiper4 = new Swiper(".swiper5", {
            direction: "vertical",
            loop: true,
            allowTouchMove: false,
            speed: 1000,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
          });
        }, 300);
      });