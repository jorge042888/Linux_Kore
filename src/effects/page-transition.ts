/**
 * Page Transitions — Smooth fade between page navigations.
 */
export function initPageTransition(): void {
  const content = document.querySelector<HTMLElement>('.page-content');
  if (!content) return;

  // Fade in on load
  content.classList.add('page-content');

  // Fade out on internal link click
  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;

    e.preventDefault();
    content.style.opacity = '0';
    content.style.transform = 'translateY(-10px)';

    setTimeout(() => {
      window.location.href = href;
    }, 250);
  });
}
