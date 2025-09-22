// Cursor reveal on mouse move

document.addEventListener('mousemove', function() {
  const cursorContainer = document.getElementById('CursorContainerID');

  setTimeout(function() {
    cursorContainer.style.opacity = 1;
  }, 100);
});