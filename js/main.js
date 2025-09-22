window.addEventListener('load', function () {

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }


  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;


  document.documentElement.style.scrollBehavior = 'auto';
  document.body.style.scrollBehavior = 'auto';

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

  const navWorkLinks = document.querySelectorAll('.nav-work-link');
  navWorkLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      stopLenis();
      document.body.style.overflow = 'hidden';
    });
  });

  const navWorkToggle = document.querySelector('.nav-work-toggle');
  if (navWorkToggle) {
    navWorkToggle.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.style.overflow = '';
      startLenis();
    });
  }


  const navContactLinks = document.querySelectorAll('.nav-contact-link');
  navContactLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      stopLenis();
      document.body.style.overflow = 'hidden';
    });
  });

  const navContactToggle = document.querySelector('.nav-contact-toggle');
  if (navContactToggle) {
    navContactToggle.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.style.overflow = '';
      startLenis();
    });
  }
});



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



// Slideshow 1 - HOME
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
slider1();

// Slideshow 2 - HOME
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
slider2();

// Slideshow 3 - AWARDS
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
slider3();

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
sliderMarquee();

// reveal cursor
document.addEventListener('mousemove', function() {
    const cursorContainer = document.getElementById('CursorContainerID');

    setTimeout(function() {
        cursorContainer.style.opacity = 1;
    }, 100);
});

// the studio reveal
document.addEventListener("DOMContentLoaded", function() {
document.querySelectorAll('.home-intro').forEach(element => {
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
      types: 'words', // Split by words
      tagName: 'span'
    });
    function getScrollTriggerValues() {
      if (window.matchMedia("(max-width: 480px)").matches) {
        return { start: "top 130%", end: "top 70%" };
      }
      else if (window.matchMedia("(max-width: 768px)").matches) {
        return { start: "top 130%", end: "top 70%" };
      }
      else if (window.matchMedia("(max-width: 992px)").matches) {
        return { start: "top 100%", end: "top 50%" };
      }
      else {
        return { start: "top 100%", end: "top 50%" };
      }
    }
    const scrollValues = getScrollTriggerValues();
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: scrollValues.start,
        end: scrollValues.end,
        scrub: 2,
      }
    })
    .set(element, { visibility: "visible" })
    .fromTo(element.querySelectorAll('.word'),
      { color: "#E5E5E5" },
      { color: "#1D1D1D", duration: 6, stagger: 0.4, ease: "power3.inOut" });
    function handleResize() {
      const newValues = getScrollTriggerValues();
      tl.scrollTrigger.update({
        start: newValues.start,
        end: newValues.end
      });
    }
    const mqSmall = window.matchMedia("(max-width: 479px)");
    const mqMedium = window.matchMedia("(max-width: 767px)");
    const mqLarge = window.matchMedia("(max-width: 991px)");
    mqSmall.addListener(handleResize);
    mqMedium.addListener(handleResize);
    mqLarge.addListener(handleResize);
    window.addEventListener('resize', handleResize);
  }
});
});

if (window.innerWidth >= 992) {
  var tricksWord = document.getElementsByClassName("tricks");
  for (var i = 0; i < tricksWord.length; i++) {
    var wordWrap = tricksWord.item(i);
    wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="tricksword">$2</span>');
  }
}
var tricksLetter = document.getElementsByClassName("tricksword");
for (var i = 0; i < tricksLetter.length; i++) {
  var letterWrap = tricksLetter.item(i);
  letterWrap.innerHTML = letterWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
}
function createFadeUpAnimation(target) {
  return anime.timeline({
    loop: false,
    autoplay: false,
  }).add({
    targets: target.querySelectorAll('.tricksword'),
    translateY: [100, 0], // Moves up on hover
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeInOutQuad",
    duration: 600,
    delay: (el, i) => 100 + 30 * i
  });
}
function createFadeDownAnimation(target) {
  return anime.timeline({
    loop: false,
    autoplay: false,
  }).add({
    targets: target.querySelectorAll('.tricksword'),
    translateY: [0, -100], // Moves down on mouse leave
    opacity: [1, 0],
    translateZ: 0,
    easing: "easeInOutQuad",
    duration: 600,
    delay: (el, i) => 50 * i
  });
}
var homeVideoContainers = document.querySelectorAll('.home-video-container');
homeVideoContainers.forEach(function(container) {
  var fadeUpElements = container.querySelectorAll('.fade-up');
  var animations = [];
  fadeUpElements.forEach(function(element) {
    animations.push({
      element: element,
      fadeUp: createFadeUpAnimation(element),
      fadeDown: createFadeDownAnimation(element),
    });
  });
  // Play fade-up animation on hover
  container.addEventListener('mouseenter', function() {
    animations.forEach(({ fadeUp }) => {
      fadeUp.restart();
    });
  });
  // Play fade-down animation when mouse leaves
  container.addEventListener('mouseleave', function() {
    animations.forEach(({ fadeDown }) => {
      fadeDown.restart();
    });
  });
});

window.addEventListener('load', function() {
  setTimeout(() => {
    var swiper1 = new Swiper('.swiper1', {
      direction: 'vertical',
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
    var swiper2 = new Swiper('.swiper2', {
      direction: 'vertical',
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
    var swiper3 = new Swiper('.swiper3', {
      direction: 'vertical',
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
    var swiper4 = new Swiper('.swiper4', {
      direction: 'vertical',
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
    var swiper4 = new Swiper('.swiper5', {
      direction: 'vertical',
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

document.addEventListener("DOMContentLoaded", () => {
  const allContainers = document.querySelectorAll(".home-video-container, .expertise-image-container");
  allContainers.forEach(container => {
    const iframe = container.querySelector("iframe");
    if (!iframe) return;
    const isHomeVideo = container.classList.contains("home-video-container");
    if (isHomeVideo && window.innerWidth <= 991) {
      iframe.addEventListener("load", () => {
        iframe.contentWindow.postMessage("playerPlay", "*");
      });
    }
    container.addEventListener("mouseenter", () => {
      if (window.innerWidth > 991) {
        iframe.contentWindow.postMessage("playerPlay", "*");
      }
    });
    container.addEventListener("mouseleave", () => {
      iframe.contentWindow.postMessage("playerStop", "*");
    });
  });
});