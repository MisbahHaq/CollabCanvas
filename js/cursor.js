// Cursor reveal and follow on mouse move

document.addEventListener('mousemove', function(e) {
  const cursorContainer = document.getElementById('CursorContainerID');

  cursorContainer.style.left = e.clientX + 'px';
  cursorContainer.style.top = e.clientY + 'px';
  cursorContainer.style.opacity = 1;
});