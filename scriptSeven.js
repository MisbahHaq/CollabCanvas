if (window.innerWidth >= 992) {
        var tricksWord = document.getElementsByClassName("tricks");
        for (var i = 0; i < tricksWord.length; i++) {
          var wordWrap = tricksWord.item(i);
          wordWrap.innerHTML = wordWrap.innerHTML.replace(
            /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
            '$1<span class="tricksword">$2</span>'
          );
        }
      }
      var tricksLetter = document.getElementsByClassName("tricksword");
      for (var i = 0; i < tricksLetter.length; i++) {
        var letterWrap = tricksLetter.item(i);
        letterWrap.innerHTML = letterWrap.textContent.replace(
          /\S/g,
          "<span class='letter'>$&</span>"
        );
      }
      function createFadeUpAnimation(target) {
        return anime
          .timeline({
            loop: false,
            autoplay: false,
          })
          .add({
            targets: target.querySelectorAll(".tricksword"),
            translateY: [100, 0], // Moves up on hover
            opacity: [0, 1],
            translateZ: 0,
            easing: "easeInOutQuad",
            duration: 600,
            delay: (el, i) => 100 + 30 * i,
          });
      }
      function createFadeDownAnimation(target) {
        return anime
          .timeline({
            loop: false,
            autoplay: false,
          })
          .add({
            targets: target.querySelectorAll(".tricksword"),
            translateY: [0, -100], // Moves down on mouse leave
            opacity: [1, 0],
            translateZ: 0,
            easing: "easeInOutQuad",
            duration: 600,
            delay: (el, i) => 50 * i,
          });
      }
      var homeVideoContainers = document.querySelectorAll(
        ".home-video-container"
      );
      homeVideoContainers.forEach(function (container) {
        var fadeUpElements = container.querySelectorAll(".fade-up");
        var animations = [];
        fadeUpElements.forEach(function (element) {
          animations.push({
            element: element,
            fadeUp: createFadeUpAnimation(element),
            fadeDown: createFadeDownAnimation(element),
          });
        });
        // Play fade-up animation on hover
        container.addEventListener("mouseenter", function () {
          animations.forEach(({ fadeUp }) => {
            fadeUp.restart();
          });
        });
        // Play fade-down animation when mouse leaves
        container.addEventListener("mouseleave", function () {
          animations.forEach(({ fadeDown }) => {
            fadeDown.restart();
          });
        });
      });