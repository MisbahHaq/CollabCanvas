// Animations using GSAP and Anime.js

// Studio text reveal animation
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

      // Scroll trigger values based on screen size
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

      // Handle resize
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

// Tricks animation for desktop
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

// Fade up animation
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

// Fade down animation
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

// Apply animations to home video containers
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