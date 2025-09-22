/**
 * Handles video playback controls for home video containers and expertise image containers.
 * - On mobile/tablet: Auto-plays home videos when they load
 * - On desktop: Plays videos on hover, stops on mouse leave
 */
document.addEventListener("DOMContentLoaded", () => {
  // Select all video containers that need hover/playback controls
  const allContainers = document.querySelectorAll(
    ".home-video-container, .expertise-image-container"
  );

  allContainers.forEach((container) => {
    const iframe = container.querySelector("iframe");

    // Skip if no iframe found in container
    if (!iframe) return;

    const isHomeVideo = container.classList.contains("home-video-container");

    // Auto-play home videos on mobile/tablet when iframe loads
    if (isHomeVideo && window.innerWidth <= 991) {
      iframe.addEventListener("load", () => {
        try {
          iframe.contentWindow.postMessage("playerPlay", "*");
        } catch (error) {
          console.warn('Failed to auto-play video on mobile:', error);
        }
      });
    }

    // Desktop hover controls
    container.addEventListener("mouseenter", () => {
      if (window.innerWidth > 991) {
        try {
          iframe.contentWindow.postMessage("playerPlay", "*");
        } catch (error) {
          console.warn('Failed to play video on hover:', error);
        }
      }
    });

    container.addEventListener("mouseleave", () => {
      try {
        iframe.contentWindow.postMessage("playerStop", "*");
      } catch (error) {
        console.warn('Failed to stop video on mouse leave:', error);
      }
    });
  });
});