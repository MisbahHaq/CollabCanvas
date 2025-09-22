// Splide sliders initialization

// Home slider 1
function slider1() {
  document.querySelectorAll('.slider1').forEach(slider => {
    const splide = new Splide(slider, {
      type: 'slide',
      perPage: 3,
      gap: '1vw',
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
          gap: '2vw',
          flickMaxPages: 1,
        },
        768: {
          gap: '3vw',
          flickMaxPages: 1,
        },
        478: {
          gap: '4vw',
          flickMaxPages: 1,
        },
      }
    });
    delete splide.options.autoplay;
    splide.mount();
  });
}

// Expertise slider 2
function slider2() {
  document.querySelectorAll('.slider2').forEach(slider => {
    const splide = new Splide(slider, {
      perPage: 3,
      arrows: false,
      pagination: false,
      gap: '1vw',
      breakpoints: {
        991: {
          perPage: 1,
          pagination: true,
          autoScroll: false,
          gap: '2vw',
        },
        768: { gap: '2vw' },
        478: { gap: '4vw' },
      }
    }).mount(window.splide.Extensions);

    // Equalize heights
    const equalizeHeights = () => {
      const slides = splide.Components.Elements.slides;
      let maxHeight = Math.max(...[...slides].map(slide => {
        slide.style.height = '';
        return slide.offsetHeight;
      }));
      if (maxHeight > 0) {
        slides.forEach(slide => slide.style.height = `${maxHeight}px`);
      }
    };

    splide.on('mounted resize', equalizeHeights);
    window.addEventListener('resize', () => splide.refresh());
  });
}

// Awards slider 3
function slider3() {
  document.querySelectorAll('.slider3').forEach(slider => {
    const splide = new Splide(slider, {
      type: 'slide',
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
          gap: '4vw',
          pagination: true,
          flickMaxPages: 1,
        },
      },
    });
    splide.mount();
  });
}

// Marquee slider
function sliderMarquee() {
  let splides = document.querySelectorAll('.slider-marquee');
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    let splide = new Splide(splides[i], {
      type: "loop",
      gap: '4vw',
      drag: 'free',
      arrows: false,
      pagination: false,
      autoWidth: true,
      rewind: false,
      trimSpace: true,
      autoScroll: {
        speed: 1,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
      breakpoints: {
        1920: { gap: '4vw' },
        1440: { gap: '4vw' },
        991: { gap: '6vw' },
        768: { gap: '6vw' },
        478: { gap: '6vw' },
      }
    }).mount(window.splide.Extensions);
  }
}

// Initialize sliders
slider1();
slider2();
slider3();
sliderMarquee();