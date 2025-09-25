let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
let dots = [];
const arrayColors = ['#eee', 'black', 'grey', 'black', 'black'];

for (let index = 0; index < 50; index++) {
  dots.push({
    x: Math.floor(Math.random() * canvas.width),
    y: Math.floor(Math.random() * canvas.height),
    size: Math.random() * 3 + 5,
    color: arrayColors[Math.floor(Math.random() * 5)]
  });
}

const drawDots = () => {
  dots.forEach(dot => {
    ctx.fillStyle = dot.color;
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.fill();
  });
};
drawDots();

function handleInteraction(x, y) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
  dots.forEach(dot => {
    let distance = Math.sqrt((x - dot.x) ** 2 + (y - dot.y) ** 2);
    if (distance < 300) {
      ctx.strokeStyle = dot.color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(dot.x, dot.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });
}

// ✅ Only enable interaction on desktop screens
if (window.innerWidth > 768) {
  banner.addEventListener('mousemove', (event) => {
    const x = event.pageX - banner.getBoundingClientRect().left;
    const y = event.pageY - banner.getBoundingClientRect().top;
    handleInteraction(x, y);
  });

  banner.addEventListener('mouseout', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
  });
}

window.addEventListener('resize', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  canvas.width = banner.offsetWidth;
  canvas.height = banner.offsetHeight;

  dots = [];
  for (let index = 0; index < 50; index++) {
    dots.push({
      x: Math.floor(Math.random() * canvas.width),
      y: Math.floor(Math.random() * canvas.height),
      size: Math.random() * 3 + 5,
      color: arrayColors[Math.floor(Math.random() * 5)]
    });
  }
  drawDots();
});
