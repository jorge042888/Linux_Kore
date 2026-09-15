/**
 * Matrix Rain Effect — Canvas animation for hero section.
 * Renders falling katakana/code characters in green.
 */
export function initMatrixRain(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const fontSize = 14;
  let columns = 0;
  let drops: number[] = [];

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]=/\\';

  function resize(): void {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -100);
  }

  function draw(): void {
    if (!ctx) return;

    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px JetBrains Mono, monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Head of column is brighter
      const brightness = Math.random();
      if (brightness > 0.95) {
        ctx.fillStyle = '#ffffff';
      } else if (brightness > 0.8) {
        ctx.fillStyle = '#00ff41';
      } else {
        ctx.fillStyle = 'rgba(0, 255, 65, 0.4)';
      }

      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i] += 0.5 + Math.random() * 0.5;
    }

    requestAnimationFrame(draw);
  }

  resize();
  draw();

  let resizeTimer: ReturnType<typeof setTimeout>;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });
}
