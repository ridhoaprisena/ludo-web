export function fireConfetti(canvas) {
  if (!canvas) return () => {};
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let animationFrameId;
  const particles = [];
  const colors = [
    '#B3261E', '#E46962',
    '#2E6C38', '#6BD880',
    '#E5A100', '#FFD875',
    '#00639B', '#7FCFFF',
    '#6750A4', '#D0BCFF',
  ];

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width * (0.2 + Math.random() * 0.6),
      y: canvas.height * 0.4 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 14 - 6,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      drag: 0.98,
      gravity: 0.35,
      opacity: 1,
    });
  }

  let running = true;

  const render = () => {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeCount = 0;
    particles.forEach((p) => {
      p.vx *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      if (p.y > canvas.height - 20) {
        p.opacity -= 0.02;
      }

      if (p.opacity > 0) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (activeCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  render();

  return () => {
    running = false;
    cancelAnimationFrame(animationFrameId);
  };
}
