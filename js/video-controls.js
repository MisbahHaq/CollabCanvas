// Video controls for iframes

document.addEventListener("DOMContentLoaded", () => {
  const allContainers = document.querySelectorAll(".home-video-container, .expertise-image-container");
  allContainers.forEach(container => {
    const iframe = container.querySelector("iframe");
    if (!iframe) return;

    const isHomeVideo = container.classList.contains("home-video-container");

    // Auto-play for home videos on mobile
    if (isHomeVideo && window.innerWidth <= 991) {
      iframe.addEventListener("load", () => {
        iframe.contentWindow.postMessage("playerPlay", "*");
      });
    }

    // Play on hover for desktop
    container.addEventListener("mouseenter", () => {
      if (window.innerWidth > 991) {
        iframe.contentWindow.postMessage("playerPlay", "*");
      }
    });

    // Stop on mouse leave
    container.addEventListener("mouseleave", () => {
      iframe.contentWindow.postMessage("playerStop", "*");
    });
  });
});