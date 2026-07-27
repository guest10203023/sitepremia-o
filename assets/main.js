+/* ========== RAINBOW CURSOR + TRAIL ========== */
(function () {
  const canvas = document.createElement('canvas');
  canvas.className = 'trail-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const dot = document.createElement('div');
  dot.id = 'cursor-dot';
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  document.body.appendChild(ring);

  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  const points = [];
  const maxPoints = 45;
  let mouseX = width / 2;
  let mouseY = height / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    points.push({ x: mouseX, y: mouseY, age: 0 });
    if (points.length > maxPoints) points.shift();
  });

  // Hover effect on interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .option, .btn, .card')) {
      ring.style.width = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = 'rgba(34, 211, 238, 0.9)';
      dot.style.width = '6px';
      dot.style.height = '6px';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .option, .btn, .card')) {
      ring.style.width = '36px';
      ring.style.height = '36px';
      ring.style.borderColor = 'rgba(255,255,255,0.6)';
      dot.style.width = '10px';
      dot.style.height = '10px';
    }
  });

  function hueFromIndex(i, total) {
    return (i / total) * 360;
  }

  function animate() {
    // Smooth ring follow
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    // Clear with fade
    ctx.clearRect(0, 0, width, height);

    // Draw rainbow trail
    if (points.length > 1) {
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const t = i / points.length;
        const hue = hueFromIndex(i, points.length);
        const alpha = t * 0.85;
        const lineWidth = t * 4.5;

        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    }

    // Age points slightly (for future fade if needed)
    points.forEach(p => p.age++);

    requestAnimationFrame(animate);
  }

  animate();
})();

/* ========== PAGE ENTER ANIMATION ========== */
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('page-enter');
});

/* ========== UTILITY: close modal ========== */
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}
