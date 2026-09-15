/**
 * Scroll Reveal — Intersection Observer that triggers CSS animations.
 * Elements with .reveal, .reveal-left, .reveal-right, .reveal-scale,
 * and .stagger-children get animated when entering viewport.
 */
export function initScrollReveal(): void {
  const targets = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
  );

  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
}
