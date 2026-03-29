document.addEventListener('DOMContentLoaded', () => {

  // 1. Film Grain
  const grain = document.getElementById('grain');
  if (grain) {
    const ctx = grain.getContext('2d');
    function resize() { grain.width = window.innerWidth; grain.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    function draw() {
      const id = ctx.createImageData(grain.width, grain.height), d = id.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = v; d[i+1] = v; d[i+2] = v; d[i+3] = 30;
      }
      ctx.putImageData(id, 0, 0);
      requestAnimationFrame(draw);
    }
    draw();
  }

  // 2. Custom Cursor
  const dot = document.getElementById('cd');
  const ring = document.getElementById('cr');
  let mx = 0, my = 0, rx = 0, ry = 0;
  if (dot && ring) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    function animCursor() {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animCursor);
    }
    animCursor();
  }

  // 3. Scroll Reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // 4. Dust Particles
  const dust = document.getElementById('dust');
  if (dust) {
    const ctx = dust.getContext('2d');
    dust.width = window.innerWidth; dust.height = window.innerHeight;
    const pts = Array.from({length: 50}, () => ({
      x: Math.random() * dust.width, y: Math.random() * dust.height,
      v: Math.random() * 0.5 + 0.2
    }));
    function drawDust() {
      ctx.clearRect(0,0,dust.width,dust.height);
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      pts.forEach(p => {
        ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI*2); ctx.fill();
        p.y -= p.v; if(p.y < 0) p.y = dust.height;
      });
      requestAnimationFrame(drawDust);
    }
    drawDust();
  }
}); // Corrected end of file
